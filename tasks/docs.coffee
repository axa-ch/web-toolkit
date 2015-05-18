runSequence = require 'run-sequence'

runAndWatch = require '../lib/run-and-watch'
after = require '../lib/after'

module.exports = (cb) ->

  # Notify execution end on fourth call, when all the tasks finished
  # * docs-pages
  # * docs-scripts
  # * docs-styles
  # * docs-assets
  end = after(3, ((err) ->
    cb err
  ), (err) ->
    if err
      cb err
  )

  # docs-pages
  runAndWatch [
    './docs/pages/**/*'
    './tmp/icons.json'
    './less/colors.json'
    './package.json',
    './docs/config.json'
  ], [
    'docs-pages'
  ],
  end

  # docs-scripts
  runAndWatch [
    './docs/js/**/*.coffee'
    #'./node_modules/jquery/dist/jquery.js' # Ignore since we do not assume that this changes
    #'./node_modules/moment/min/moment-with-locales.js' # Ignore since we do not assume that this changes
    #'./node_modules/localforage/dist/localforage.js' # Ignore since we do not assume that this changes
    #'./node_modules/knockout/build/output/knockout-latest.js' # Ignore since we do not assume that this changes
    #'./node_modules/URIjs/src/URI.js' # Ignore since we do not assume that this changes
    #'./node_modules/zeroclipboard/dist/ZeroClipboard.js' # Ignore since we do not assume that this changes
    './dist/jquery/**/*.js'
    '!./dist/jquery/**/*.min.js'
  ], [
    'docs-scripts'
  ],
  end

  # docs-styles
  runAndWatch [
    './docs/less/**/*.less'
    './dist/less/**/*.less'
  ], [
    'docs-styles'
  ],
  end

  # docs-assets
  runAndWatch [
    #'./node_modules/zeroclipboard/dist/ZeroClipboard.swf' # Ignore since we do not assume that this changes
    './docs/images/**/*'
  ], [
    'docs-assets'
  ],
  end

  return




# Copyright AXA Versicherungen AG 2015
