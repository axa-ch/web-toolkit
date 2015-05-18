runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence(
    'styles-clean',
    'styles-copy',
    'styles-icons',
    'styles-generate',
    'styles-compile',
    'styles-postcss',
    cb
  )

# Copyright AXA Versicherungen AG 2015
