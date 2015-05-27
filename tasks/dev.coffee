gulp = require 'gulp'
watch = require 'gulp-watch'

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
      './dist/jquery/axa-wsg.jquery.all.js'
    ], ->
      gulp.start 'docs-scripts', 'docs-example-scripts'
      return

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

    #######################
    # icons
    #######################
    watch [
      'icons/**/*.svg'
    ], ->
      gulp.start 'icons-svg', 'icons'

    #######################
    # images
    #######################
    watch [
      './images/**/*'
    ], ->
      gulp.start 'images'

    #######################
    # jquery
    #######################
    watch [
      './jquery/**/*'
    ], ->
      gulp.start 'jquery'

    #######################
    # ng
    #######################
    watch [
      './ng/**/*'
    ], ->
      gulp.start 'ng'

    #######################
    # styles
    #######################
    watch [
      './less/**/*.less'
      './icons/*.svg'
      './less/colors.json'
    ], ->
      gulp.start 'styles'

]

# Copyright AXA Versicherungen AG 2015
