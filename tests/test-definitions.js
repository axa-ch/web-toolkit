function addPage(path, testcases) {
  for (const testcase of testcases) {
    testcase.screenshot = `tests/actual/${testcase.name}.png`
  }
  return {
    path,
    tests: testcases,
  }
}

function getDefinitions() {
  const viewports = {
    mobile: { width: 375, height: 200 },
    tablet: { width: 900, height: 200 },
    desktop: { width: 1400, height: 400 },
  }
  const pages = []

  pages.push(addPage('/components/header/demos/standard-header.html', [
    { name: 'standard-header_mobile', viewport: viewports.mobile, expected: 'tests/expected/standard-header_mobile.png' },
    { name: 'standard-header_desktop', viewport: viewports.desktop, expected: 'tests/expected/standard-header_desktop.png' },
  ]))
  pages.push(addPage('/components/header/demos/transparent-header.html', [
    { name: 'transparent-header_mobile', viewport: viewports.mobile, expected: 'tests/expected/transparent-header_mobile.png' },
    { name: 'transparent-header_desktop', viewport: viewports.desktop, expected: 'tests/expected/transparent-header_desktop.png' },
  ]))
  pages.push(addPage('/components/buttons/demos/standard-button.html', [
    { name: 'standard-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/standard-button_mobile.png' },
    { name: 'standard-button_desktop', viewport: viewports.desktop, expected: 'tests/expected/standard-button_desktop.png' },
  ]))
  pages.push(addPage('/components/buttons/demos/icon-button.html', [
    { name: 'icon-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/icon-button_mobile.png' },
  ]))
  pages.push(addPage('/components/buttons/demos/ghost-button.html', [
    { name: 'ghost-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/ghost-button_mobile.png' },
  ]))
  pages.push(addPage('/components/buttons/demos/axa-button.html', [
    { name: 'axa-button_mobile', viewport: viewports.mobile, expected: 'tests/expected/axa-button_mobile.png' },
  ]))

  return pages
}

export default getDefinitions
