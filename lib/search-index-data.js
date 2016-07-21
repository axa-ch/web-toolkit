export default () =>
  function(files, metalsmith, done) {

    let originalContents = JSON.parse(files['searchIndex.json'].contents);

    let newContents = {
      pages: {},
      lunr: originalContents
    };

    for (let ref in originalContents.documentStore.store) {
      let data = originalContents.documentStore.store[ref];
      let file = files[ref];

      if (file == null) {
        console.log('could not find lunr indexed file in metalsmith metadata: ', ref);
      }

      newContents.pages[ref] = {
        title: file.title,
        link: file.link,
        tags: file.tags
      };
    }

    files['searchIndex.json'].contents = new Buffer(JSON.stringify(newContents));

    return done();
  }
;

//! Copyright AXA Versicherungen AG 2015
