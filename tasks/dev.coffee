gulp = require 'gulp'
$ = require('gulp-load-plugins')()

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
    $.watch [
    ], [ '' ]
    ###

    #######################
    # docs-pages
    #######################
    $.watch [
      './docs/pages/**/*'
      './docs/layouts/**/*'
      './tmp/icons.json'
      './less/colors.json'
      './package.json',
      './docs/config.json'
    ], ->
      gulp.start 'docs-pages'

    #######################
    # docs-scripts
    #######################
    $.watch [
      './docs/js/**/*.coffee'
      #'./node_modules/jquery/dist/jquery.js' # Ignore since we do not assume that this changes
      #'./node_modules/moment/min/moment-with-locales.js' # Ignore since we do not assume that this changes
      #'./node_modules/localforage/dist/localforage.js' # Ignore since we do not assume that this changes
      #'./node_modules/knockout/build/output/knockout-latest.js' # Ignore since we do not assume that this changes
      #'./node_modules/URIjs/src/URI.js' # Ignore since we do not assume that this changes
      #'./node_modules/zeroclipboard/dist/ZeroClipboard.js' # Ignore since we do not assume that this changes
      './dist/jquery/**/*.js'
      '!./dist/jquery/**/*.min.js'
    ], [ 'docs-scripts' ]

    #######################
    # docs-styles
    #######################
    $.watch [
        './docs/less/**/*.less'
        # Listen on css instead of less to ensure all the styles-* task finished
        # TODO: styles task could throw an event instead?!
        './dist/css/style.css'
    ], ->
      gulp.start 'docs-styles'

    #######################
    # docs-assets
    #######################
    $.watch [
        #'./node_modules/zeroclipboard/dist/ZeroClipboard.swf' # Ignore since we do not assume that this changes
        './docs/images/**/*'
    ], ->
      gulp.start 'docs-assets'

    #######################
    # icons
    #######################
    $.watch [
      'icons/**/*.svg'
    ], ->
      gulp.start 'icons-svg', 'icons'

    #######################
    # images
    #######################
    $.watch [
      './images/**/*'
    ], ->
      gulp.start 'images'

    #######################
    # jquery
    #######################
    $.watch [
      './jquery/**/*'
    ], ->
      gulp.start 'jquery'

    #######################
    # ng
    #######################
    $.watch [
      './jquery/**/*'
    ], ->
      gulp.start 'ng'

    #######################
    # styles
    #######################
    $.watch [
      './less/**/*.less'
      './icons/*.svg'
      './less/colors.json'
    ], ->
      gulp.start 'styles'

]

# Copyright AXA Versicherungen AG 2015
