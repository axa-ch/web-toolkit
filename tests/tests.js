function addDefinition(page, testcases) {
  for (var i = 0; i < testcases.length; i++) {
    testcases[i].screenshot = 'actual/' + testcases[i].name + '.png';
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

  definitions.push(addDefinition('/components/demos/font-test', [
    { name: 'font_mobile', viewport: viewports.mobile, expected: 'expected/font_mobile.png' },
    { name: 'font_desktop', viewport: viewports.desktop, expected: 'expected/font_desktop.png' }
  ]));
  definitions.push(addDefinition('/components/demos/badge', [
    { name: 'badge_mobile', viewport: viewports.mobile, expected: 'expected/badge_mobile.png' },
    { name: 'badge_tablet', viewport: viewports.tablet, expected: 'expected/badge_tablet.png' }
  ]));
  definitions.push(addDefinition('/components/demos/button-ghost', [
    { name: 'button-ghost_mobile', viewport: viewports.mobile, expected: 'expected/button-ghost_mobile.png' },
    { name: 'button-ghost_tablet', viewport: viewports.tablet, expected: 'expected/button-ghost_tablet.png' }
  ]));

  return definitions;
}

module.exports = {
    getDefinitions: getDefinitions
};