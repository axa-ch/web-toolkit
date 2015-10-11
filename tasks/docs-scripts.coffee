gulp = require 'gulp'
merge = require 'merge-stream'
sourcemaps = require 'gulp-sourcemaps'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
modernizr = require 'gulp-modernizr'
gIf = require 'gulp-if'

errorify = require '../lib/errorify'
readJson = require '../lib/readJSONFile'

module.exports = ->
  libs = gulp.src [
      './node_modules/jquery/dist/jquery.js'
      './node_modules/baconjs/dist/Bacon.js'
      './node_modules/moment/min/moment-with-locales.js'
      './node_modules/zeroclipboard/dist/ZeroClipboard.js'
      './node_modules/svg4everybody/svg4everybody.js'
      './node_modules/lunr/lunr.min.js' # use min here since non-minified version misses a semicolon at the end
      './node_modules/iframe-resizer/src/iframeResizer.js'
      './dist/jquery/axa-wsg.jquery.all.js'
      './docs/js/**/*.coffee'
    ]
    .pipe gIf('**/*.coffee', coffee())
      .pipe sourcemaps.init { loadMaps: true }
      .on 'error', errorify
      .pipe concat 'docs.all.min.js'
    .pipe sourcemaps.write('.', sourceRoot: './' )
    .pipe gulp.dest './dist/docs/js'

  settings = readJson 'modernizr.json'
  mdrnzr = gulp.src 'nothing'
    .pipe modernizr('modernizr.js', settings)
    .pipe gulp.dest './dist/docs/js'

  return merge(libs, mdrnzr)

#! Copyright AXA Versicherungen AG 2015
