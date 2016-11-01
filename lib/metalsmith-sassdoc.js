import sassdoc from 'sassdoc'
import slug from 'slug'
import _ from 'lodash'

function sassdocPlugin() {
  return (files, metalsmith, done) => {
    const data = {
      comments: {},
    }

    _.forEach(files, (file) => {
      const sass = file.contents.toString()

      let env = {}
      env = sassdoc.ensureEnvironment(env)
      const sassdocParser = new sassdoc.Parser(env, [
        /* add annotation handlers here */
      ])

      const fileComments = sassdocParser.parse(sass)

      _.forEach(fileComments, (comment) => {
        // Simplify interpolation from #{$var} to {var}
        // eslint-disable-next-line no-param-reassign
        comment.context.name = comment.context.name.replace(/#{\$(.*)}/, '{$1}')

        const nameSlug = slug(comment.context.name, { lower: true })

        data.comments[comment.context.name] = comment

        // Add file to metalsmith so it will be processed in the
        // normal handlebars build
        // Content of the file will just be an include of
        // the partial sassdoc-template, which renders the comment
        files[`api/${nameSlug}.json`] = { // eslint-disable-line no-param-reassign
          comment,
          title: comment.context.name,
          nav: [`sassdoc/${nameSlug}`, `side/api/${nameSlug}`],
          link: `/api/#${nameSlug}`,
          contents: new Buffer(JSON.stringify(comment)),
        }
      })
    })

    // Add all sassdoc comments to metadata for later use (e.g. sitemap)
    metalsmith.metadata().sassdoc = data // eslint-disable-line no-param-reassign

    done()
  }
}

export default sassdocPlugin
