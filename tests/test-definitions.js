function addPage(page, testcases) {
  for (var i = 0; i < testcases.length; i++) {
    testcases[i].screenshot = 'tests/actual/' + testcases[i].name + '.png';
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
  var pages = [];

  pages.push(addPage('/components/demos/font-test', [
    { name: 'font_mobile', viewport: viewports.mobile, expected: 'tests/expected/font_mobile.png' },
    { name: 'font_desktop', viewport: viewports.desktop, expected: 'tests/expected/font_desktop.png' }
  ]));
  pages.push(addPage('/components/demos/badge', [
    { name: 'badge_mobile', viewport: viewports.mobile, expected: 'tests/expected/badge_mobile.png' },
    { name: 'badge_tablet', viewport: viewports.tablet, expected: 'tests/expected/badge_tablet.png' }
  ]));
  pages.push(addPage('/components/demos/button-ghost', [
    { name: 'button-ghost_mobile', viewport: viewports.mobile, expected: 'tests/expected/button-ghost_mobile.png' },
    { name: 'button-ghost_tablet', viewport: viewports.tablet, expected: 'tests/expected/button-ghost_tablet.png' }
  ]));

  return pages;
}

module.exports = {
    getDefinitions: getDefinitions
};