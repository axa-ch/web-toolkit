import glob from 'glob'
import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import jsdoc2markdown from 'jsdoc-to-markdown'

const jsdoc2md = function(globExpression) {
  return (files, metalsmith, done) => {
    const jsFiles = glob.sync(globExpression)

    for (const filePath of jsFiles) {
      const doc = jsdoc2markdown.renderSync({
        files: filePath,
        configure: '.jsdocrc',
      })

      if (doc) {
        const mdPath = `docs/jsdoc2md/${filePath.replace('.js', '.md')}`

        mkdirp.sync(path.dirname(mdPath))
        fs.writeFileSync(mdPath, doc)
      }
    }
    
    done();
  }
}

export default jsdoc2md
