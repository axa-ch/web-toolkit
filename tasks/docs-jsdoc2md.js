import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import gulp from 'gulp'
import util from 'gulp-util'
import foreach from 'gulp-foreach'
import cached from 'gulp-cached'
import jsdoc2md from 'jsdoc-to-markdown'

module.exports = () =>
  gulp.src('js/**/*.js', { base: 'js', read: false })
    .pipe(cached('docs-jsdoc2md'))
    .pipe(foreach(function (stream, file) {
      const filename = file.relative

      // @todo: JSDoc does not work with JSX so far, consider ESDoc
      try {
        const docs = jsdoc2md.renderSync({
          files: `js/${filename}`,
          configure: '.jsdocrc',
        })

        if (docs) {
          mkdirp.sync(path.dirname(`docs/page/jsdoc2md/${filename}`))
          fs.writeFileSync(`docs/page/jsdoc2md/${filename.replace('.js', '.md')}`, docs)
        }
      } catch (e) {
        util.log(e)
      }

      return stream
    }))

//! Copyright AXA Versicherungen AG 2016
