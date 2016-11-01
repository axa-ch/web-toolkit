var handlebars = require('handlebars');
var fs = require('fs');

function createResultPage(pages) {
  handlebars.registerHelper('gt', function(a, b, opts) {
    console.log(a, b, opts);
    if (a > b)
      return opts.fn(this);
    else
      return opts.inverse(this);
  });

  var numberOfTests = 0;
  var numberOfFailedTests = 0;
  var numberOfPages = 0;
  var numberOfFailedPages = 0;

  for (var pageIndex = 0; pageIndex < pages.length; pageIndex++) {
    var page = pages[pageIndex];
    page.ok = true;
    numberOfPages++;

    for (var testIndex = 0; testIndex < page.tests.length; testIndex++) {
      var test = page.tests[testIndex];
      numberOfTests++;
      
      if (test.misMatchPercentage > 0) {
        page.ok = false;
        numberOfFailedTests++;
      }
    }

    if (!page.ok) {
      numberOfFailedPages++;
    }
  }

  var template = handlebars.compile(fs.readFileSync('template.hbs', 'utf-8'));

  var output = template({
    pages: pages,
    numberOfFailedPages: numberOfFailedPages,
    numberOfFailedTests: numberOfFailedTests,
    numberOfPages: numberOfPages,
    numberOfTests: numberOfTests
  });
  console.log(output);

  fs.writeFileSync('tests/results.html', output);
}

module.exports = {
  createResultPage: createResultPage
};