import browserify from 'browserify'
import shim from 'browserify-shim'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import es from 'event-stream'

import handleError from '../lib/handle-error'

module.exports = () => {
  // we define our input files, which we want to have
  // bundled:
  const files = [
    'jquery/index.js',
    'react/index.js',
    'index.js',
  ]

  const tasks = files.map((file) =>
    browserify()
      .transform(shim)
      .add(`dist/js/${file}`)
      .bundle()
      .on('error', handleError('Browserify failed'))
      .pipe(source(getSourceName(file)))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('dist/js'))
      .pipe(uglify())
      .on('error', handleError('Uglify failed'))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('dist/js'))
  )

  // create a merged stream
  return es.merge.apply(null, tasks)
}

function getSourceName(file) {
  switch (file) {
    case 'index.js':
      return 'axa-web-style-guide-all.js'

    default:
      return file.replace('/index', `/${file.split('/')[0]}.bundle`)
  }
}

//! Copyright AXA Versicherungen AG 2016
