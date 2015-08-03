gulp = require 'gulp'
watch = require 'gulp-watch'
sequence = require 'gulp-watch-sequence'

errorify = require '../lib/errorify'

module.exports = [
  [
    'build'
  ],
  (cb) ->

    gulp.start 'serve'

    #######################
    #
    #######################
    ###
    watch [
    ], [ '' ]
    ###

    #######################
    # docs-pages
    #######################
    watch [
      './docs/page/**/*'
      './docs/layouts/**/*'
      './tmp/icons.json'
      './less/colors.json'
      './package.json',
      './docs/config.json'
    ], (files, cb) ->
      gulp.start 'docs-pages', cb
    .on 'error', (err) -> errorify err.message, 'docs-pages'


    #######################
    # docs-scripts
    #######################
    watch [
      './docs/js/**/*.coffee'
      './docs/example-js/**/*.coffee'
      #'./node_modules/jquery/dist/jquery.js' # Ignore since we do not assume that this changes
      #'./node_modules/moment/min/moment-with-locales.js' # Ignore since we do not assume that this changes
      #'./node_modules/localforage/dist/localforage.js' # Ignore since we do not assume that this changes
      #'./node_modules/knockout/build/output/knockout-latest.js' # Ignore since we do not assume that this changes
      #'./node_modules/URIjs/src/URI.js' # Ignore since we do not assume that this changes
      #'./node_modules/zeroclipboard/dist/ZeroClipboard.js' # Ignore since we do not assume that this changes
      #'./dist/jquery/axa-wsg.jquery.all.js' # Ignore. Only changed by the jquery task. The watch to trigger the jquery task triggers the docs-scripts too
    ], ->
      gulp.start 'docs-scripts', 'docs-example-scripts', 'docs-inspiration-scripts'
      return
    .on 'error', (err) -> errorify err.message, 'docs-scripts'

    #######################
    # docs-styles
    #######################
    watch [
        './docs/less/**/*.less'
        # Listen on css instead of less to ensure all the styles-* task finished
        # TODO: styles task could throw an event instead?!
        './dist/css/style.css'
    ], ->
      gulp.start 'docs-styles'
    .on 'error', (err) -> errorify err.message, 'docs-styles'

    #######################
    # docs-assets
    #######################
    watch [
        #'./node_modules/zeroclipboard/dist/ZeroClipboard.swf' # Ignore since we do not assume that this changes
        './docs/images/**/*'
        './dist/images/**/*'
        './dist/fonts/**/*'
        './dist/css/{style,normalize}.min.css{,.map}'
    ], ->
      gulp.start 'docs-assets'
    .on 'error', (err) -> errorify err.message, 'docs-assets'

    #######################
    # icons
    #######################
    watch [
      'icons/**/*.svg'
    ], ->
      gulp.start 'icons-svg', 'icons'
    .on 'error', (err) -> errorify err.message, 'icons-svg'

    #######################
    # images
    #######################
    watch [
      './images/**/*'
    ], ->
      gulp.start 'images'
    .on 'error', (err) -> errorify err.message, 'images'

    #######################
    # jquery
    #######################
    queue = sequence 300
    watch [
      './jquery/**/*'
    ], queue.getHandler 'jquery', 'docs-scripts', 'docs-example-scripts', 'docs-inspiration-scripts'
    .on 'error', (err) -> errorify err.message, 'jquery'

    #######################
    # ng
    #######################
    watch [
      './ng/**/*'
    ], ->
      gulp.start 'ng'
    .on 'error', (err) -> errorify err.message, 'ng'

    #######################
    # styles
    #######################
    watch [
      './less/**/*.less'
      './icons/*.svg'
      './less/colors.json'
    ], ->
      gulp.start 'styles'
    .on 'error', (err) -> errorify err.message, 'styles'

]

# Copyright AXA Versicherungen AG 2015
