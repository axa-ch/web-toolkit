import sassdoc from 'sassdoc'

function sassdocPlugin() {
  return (files, metalsmith, done) => {
    const data = {
      comments: {},
    }
    for (const file in files) {
      const sass = files[file].contents.toString()

      let env = {}
      env = sassdoc.ensureEnvironment(env)
      const sassdocParser = new sassdoc.Parser(env, [/*add annotation handlers here*/])

      const fileComments = sassdocParser.parse(sass)

      for (let comment of fileComments) {
        let urlFriendlyName = comment.context.name
        if (urlFriendlyName.startsWith('.')) {
          urlFriendlyName = '_' + urlFriendlyName.substring(1)
        }
        comment.urlFriendlyName = urlFriendlyName

        data.comments[comment.context.name] = comment

        // Add file to metalsmith so it will be processed in the
        // normal handlebars build
        // Content of the file will just be an include of
        // the partial sassdoc-template, which renders the comment
        files[`sassdoc/${comment.urlFriendlyName}.hbs`] = {
          comment: comment,
          title: comment.context.name,
          nav: `side/api/${comment.urlFriendlyName}`,
          contents: new Buffer("{{>sassdoc-template}}"),
        }
      }
    }

    // Add all sassdoc comments to metadata for later use (e.g. sitemap)
    metalsmith.metadata().sassdoc = data

    done()
  }
}

export default sassdocPlugin
