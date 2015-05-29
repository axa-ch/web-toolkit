gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
gIf = require 'gulp-if'

errorify = require '../lib/errorify'

module.exports = ->
    return gulp.src [
        './node_modules/jquery/dist/jquery.js'
        './node_modules/moment/min/moment-with-locales.js'
        './node_modules/localforage/dist/localforage.js'
        './node_modules/knockout/build/output/knockout-latest.js'
        './node_modules/URIjs/src/URI.js'
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
