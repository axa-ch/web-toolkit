module.exports = ->
  (files, metalsmith, done) ->

    originalContents = JSON.parse files['searchIndex.json'].contents

    newContents =
      pages: {}
      lunr: originalContents

    for ref, data of originalContents.documentStore.store
      file = files[ref]

      if !file?
        console.log 'could not find lunr indexed file in metalsmith metadata: ', ref

      newContents.pages[ref] = {
        title: file.title
        link: file.link
        tags: file.tags
      }

    files['searchIndex.json'].contents = new Buffer JSON.stringify newContents

    done()

#! Copyright AXA Versicherungen AG 2015
