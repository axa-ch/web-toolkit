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

  pages.push(addPage('/components/header/demos/standard-header', [
    { name: 'standard-header_mobile', viewport: viewports.mobile, expected: 'tests/expected/font_mobile.png' },
    { name: 'standard-header_desktop', viewport: viewports.desktop, expected: 'tests/expected/font_desktop.png' }
  ]));
  pages.push(addPage('/components/header/demos/transparent-header', [
    { name: 'transparent-header_mobile', viewport: viewports.mobile, expected: 'tests/expected/badge_mobile.png' },
    { name: 'transparent-header_desktop', viewport: viewports.desktop, expected: 'tests/expected/badge_tablet.png' }
  ]));
  pages.push(addPage('/components/buttons/demos/standard-button', [
    { name: 'standard-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/button-ghost_mobile.png' },
    { name: 'standard-button_desktop', viewport: viewports.desktop, expected: 'tests/expected/badge_tablet.png' }
  ]));
  pages.push(addPage('/components/buttons/demos/icon-button', [
    { name: 'icon-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/button-ghost_mobile.png' },
  ]));
  pages.push(addPage('/components/buttons/demos/ghost-button', [
    { name: 'ghost-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/button-ghost_mobile.png' },
  ]));
  pages.push(addPage('/components/buttons/demos/axa-button', [
    { name: 'axa-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/button-ghost_mobile.png' },
  ]));

  return pages;
}

module.exports = {
    getDefinitions: getDefinitions
};
