function addDefinition(page, testcases) {
  for (var i = 0; i < testcases.length; i++) {
    testcases[i].screenshot = 'actual' + page;
  }
  return {
    page: page + '.html',
    tests: testcases
  };
}

function getDefinitions() {
  var viewports = {
    mobile: { width: 375, height: 200 },
    tablet: { width: 900, height: 200 },
    desktop: { width: 1400, height: 400 }
  };
  var definitions = [];

  definitions.push(addDefinition('/components/demos/badge', [
    { viewport: viewports.mobile, expected: '/badge_mobile.png' },
    { viewport: viewports.tablet, expected: '/badge_tablet.png' }
  ]));
  definitions.push(addDefinition('/components/demos/button-ghost', [
    { viewport: viewports.mobile, expected: '/button-ghost_mobile.png' },
    { viewport: viewports.tablet, expected: '/button-ghost_tablet.png' }
  ]));

  return definitions;
}

module.exports = {
    getDefinitions: getDefinitions
};