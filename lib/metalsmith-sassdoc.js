import sassdoc from 'sassdoc'
import slug from 'slug'
import _ from 'lodash'
import colorAnnotation from './sassdoc/color-annotation'
import titleAnnotation from './sassdoc/title-annotation'

function sassdocPlugin() {
  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata()
    metadata.sassdoc = {
      comments: {},
      colors: {},
    }

    _.forEach(files, (file) => {
      const sass = file.contents.toString()

      let env = {}
      env = sassdoc.ensureEnvironment(env)
      const sassdocParser = new sassdoc.Parser(env, [
        colorAnnotation,
        titleAnnotation,
      ])

      const fileComments = sassdocParser.parse(sass)

      _.forEach(fileComments, (comment) => {
        // Simplify interpolation from #{$var} to {var}
        // eslint-disable-next-line no-param-reassign
        comment.context.name = comment.context.name.replace(/#{\$(.*)}/, '{$1}')

        // Add to a general index of sass artifacts in the metalsmith metadata
        metadata.sassdoc.comments[comment.context.name] = comment

        if (comment.color) {
          const color = {
            value: comment.context.value,
            name: comment.context.name,
            description: comment.description,
            title: comment.title,
            alias: comment.alias,
          }

          for (const colorType of comment.color) {
            if (!metadata.sassdoc.colors[colorType]) {
              metadata.sassdoc.colors[colorType] = []
            }
            metadata.sassdoc.colors[colorType].push(color)
          }
        }
      })
    })

    done()
  }
}

export default sassdocPlugin
