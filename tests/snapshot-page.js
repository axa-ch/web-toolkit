import phantom from 'phantom'

function snapshotPage(page) {
  let sitepage
  let phantomInstance

  function snapshotViewport(i) {
    if (i < page.tests.length) {
      const test = page.tests[i]
      sitepage.property('viewportSize', test.viewport)
      return sitepage.renderBase64('PNG')
        .then((base64Image) => {
          test.snapshotBase64 = base64Image
          return i + 1
        })
        .then(snapshotViewport)
    }
    return 'all viewports rendered'
  }

  return phantom.create()
    .then((instance) => {
      phantomInstance = instance
      return instance.createPage()
    })
    .then((phantomPage) => {
      sitepage = phantomPage
      phantomPage.property('viewportSize', page.tests[0].viewport)
      return phantomPage.open(`${process.env.BASE_URL}${page.path}`)
    })
    .then(() => Promise.resolve(0).then(snapshotViewport))
    .then(() => {
      // console.log(content)
      sitepage.close()
      phantomInstance.exit()
      return page
    })
    .catch((error) => {
      console.log('Error:', error)
      phantomInstance.exit()
    })
}

export default snapshotPage
