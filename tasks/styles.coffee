runSequence = require 'run-sequence'

runAndWatch = require '../lib/run-and-watch'

module.exports = (cb) ->

  runAndWatch [
    './less/**/*.less'
    './icons/*.svg'
    './less/colors.json'
  ], [
    'styles-clean'
    'styles-copy'
    'styles-icons'
    'styles-variables'
    'styles-compile'
  ],
  cb

  return

# Copyright AXA Versicherungen AG 2015
