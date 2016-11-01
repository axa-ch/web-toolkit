var resemble = require('node-resemble');
var fs = require('fs');
var pages = require('./test-definitions').getDefinitions();

for (var pageIndex = 0; pageIndex < pages.length; pageIndex++) {
  var page = pages[pageIndex];

  console.log(page);

  for (var testIndex = 0; testIndex < page.tests.length; testIndex++) {
    var test = page.tests[testIndex];

    console.log('-----');
    console.log('Test:', test.name);
    console.log('Comparing', test.screenshot, 'and', test.expected);
    resemble(test.screenshot)
      .compareTo(test.expected)
      .onComplete(function (result) {
        console.log('Mismatch percentage:', result.misMatchPercentage);
        test.misMatchPercentage = result.misMatchPercentage;
        if (result.misMatchPercentage > 0) {
          var diffPath = 'tests/diff/' + test.name + '.png';
          test.diff = diffPath;
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
