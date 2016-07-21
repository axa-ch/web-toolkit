const searchIndexData = () =>
  (files, metalsmith, done) => {
    const originalContents = JSON.parse(files['searchIndex.json'].contents)
    const store = originalContents.documentStore.store
    const pages = store.keys().reduce((previous, ref) => {
      const file = files[ref]

      if (file == null) {
        console.log('could not find lunr indexed file in metalsmith metadata: ', ref)
        return previous
      }

      return {
        ...previous,
        title: file.title,
        link: file.link,
        tags: file.tags,
      }
    }, {})
    const newContents = {
      pages,
      lunr: originalContents,
    }

    files['searchIndex.json'].contents = new Buffer(JSON.stringify(newContents))

    done()
  }

export default searchIndexData

//! Copyright AXA Versicherungen AG 2015
