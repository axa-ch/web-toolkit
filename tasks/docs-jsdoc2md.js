import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import gulp from 'gulp'
import foreach from 'gulp-foreach'
import jsdoc2md from 'jsdoc-to-markdown'

module.exports = [
  [
    'docs-jsdoc-clean',
  ],
  () =>
    gulp.src('jquery/*.js', { read: false })
      .pipe(foreach(function (stream, file) {
        const filename = path.basename(file.path)

        const docs = jsdoc2md.renderSync({
          files: `jquery/${filename}`,
          configure: '.jsdocrc',
        })

        if (docs) {
          mkdirp.sync('docs/page/jsdoc2md')
          fs.writeFileSync(`docs/page/jsdoc2md/${filename.replace('.js', '.md')}`, docs)
        }

        return stream
      })),
]

//! Copyright AXA Versicherungen AG 2016
