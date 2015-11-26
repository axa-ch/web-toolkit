babelify = require 'babelify'
browserify = require 'browserify'
shim = require 'browserify-shim'
coffeeify = require 'coffeeify'
gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
gutil = require 'gulp-util'
buffer = require 'vinyl-buffer'
source = require 'vinyl-source-stream'
notifier = require 'node-notifier'

module.exports = (cb) ->
  browserify({
      debug: true,
      extensions: ['.js', '.coffee']
    })
    .transform(babelify, {
      presets: ['es2015']
    })
    .transform(coffeeify)
    .transform(shim)
    .add('docs/js/index.js')
    .bundle()
    .on 'error', (err) ->
      gutil.log(err.message)
      notifier.notify({
        title: 'Browserify Failed',
        message: err.message
      })
      this.emit('end')

    .pipe(source('style-guide-docs.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', gutil.log)
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/docs/js'))

#! Copyright AXA Versicherungen AG 2015
