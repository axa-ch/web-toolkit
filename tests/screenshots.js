var webpage = require('webpage');
var fs = require('fs');
var definitions = require('./test-definitions').getDefinitions();
var system = require('system');

var baseUrl = system.env.BASE_URL || 'http://192.168.99.100:3000';

var delay = 10;

function openPage(index) {
  var demo = definitions[index];
  var page = webpage.create();

  page.viewportSize = demo.tests[0].viewport;
  
  page.settings.localToRemoteUrlAccessEnabled = true

  page.open(baseUrl + demo.page, function(status) {
    function executeTest(testIndex) {
      var test = demo.tests[testIndex];
      if (page.viewports !== test.viewport)
      {
        page.viewportSize = test.viewport;
        page.reload();
      }
      var filename = test.screenshot; 
      page.render(filename);

      if (!fs.exists(filename)) {
        setTimeout(function() {
          executeTest(testIndex);
        }, delay);
        return;
      }

      if (testIndex < demo.tests.length-1) {
        executeTest(testIndex + 1)
      }
      else {
        page.close();
        if (index + 1 < definitions.length) {
          openPage(index + 1);
        }
        else {
          phantom.exit(0);
        }
      }
    }

    executeTest(0);
  });
}

openPage(0);
