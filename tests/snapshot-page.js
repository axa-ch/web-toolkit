import phantom from 'phantom'

function snapshotPage(page) {
  let sitepage
  let phantomInstance

  function snapshotViewport(i) {
    if (i < page.tests.length) {
      const test = page.tests[i]
      sitepage.property('viewportSize', test.viewport)
      sitepage.render(test.screenshot)
        .then(snapshotViewport(i + 1))
    }
    return 'all viewports rendered'
  }

  phantom.create()
    .then((instance) => {
      phantomInstance = instance
      return instance.createPage()
    })
    .then((phantomPage) => {
      sitepage = phantomPage
      phantomPage.property('viewportSize', page.tests[0].viewport)
      return phantomPage.open('https://design.axa.com/toolkit')
    })
    .then(() => Promise.resolve(0).then(snapshotViewport))
    .then((content) => {
      console.log(content)
      sitepage.close()
      phantomInstance.exit()
    })
    .catch((error) => {
      console.log(error)
      phantomInstance.exit()
    })
}

export default snapshotPage
