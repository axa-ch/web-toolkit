var resemble = require('node-resemble');
var fs = require('fs');
var pages = require('./test-definitions').getDefinitions();
var resultPage = require('./result-page');

for (var pageIndex = 0; pageIndex < pages.length; pageIndex++) {
  var page = pages[pageIndex];

  for (var testIndex = 0; testIndex < page.tests.length; testIndex++) {
    var test = page.tests[testIndex];

    resemble(test.screenshot)
      .compareTo(test.expected)
      .onComplete(function (result) {
        test.misMatchPercentage = result.misMatchPercentage;
        if (result.misMatchPercentage > 0) {
          var diffPath = 'tests/diff/' + test.name + '.png';
          test.diff = diffPath;
          
          var imgDataUrl = result.getImageDataUrl();
          var base64Data = imgDataUrl.replace(/^data:image\/png;base64,/, "");
          
          require("fs").writeFile(diffPath, base64Data, 'base64', function(err) {
            console.log(err);
          });
        }
      });
  }
}

resultPage.createResultPage(pages)
