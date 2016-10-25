var resemble = require('node-resemble');
var fs = require('fs');
var definitions = require('./tests').getDefinitions();

for (var pageIndex = 0; pageIndex < definitions.length; pageIndex++) {
  var definition = definitions[pageIndex];

  console.log(definition);

  for (var testIndex = 0; testIndex < definition.tests.length; testIndex++) {
    var test = definition.tests[testIndex];

    console.log('-----');
    console.log('Test:', test.name);
    console.log('Comparing', test.screenshot, 'and', test.expected);
    resemble(test.screenshot)
      .compareTo(test.expected)
      .onComplete(function (result) {
        console.log('Mismatch percentage:', result.misMatchPercentage);
        if (result.misMatchPercentage > 0) {
          var diffPath = 'diff/' + test.name + '.png';
          console.log('Mismatch percentage greater than 0. Saving the diff to', diffPath);
          
          var imgDataUrl = result.getImageDataUrl();
          var base64Data = imgDataUrl.replace(/^data:image\/png;base64,/, "");
          
          require("fs").writeFile(diffPath, base64Data, 'base64', function(err) {
            console.log(err);
          });
        }
        console.log('Proceeding to next test...');
      });
  }
}
