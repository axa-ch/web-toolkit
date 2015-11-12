runSequence = require 'run-sequence'

module.exports = (cb) ->
  # TODO: parellel (without docs)?
  runSequence(
    'clean'
    'images'
    'icons-copy'
    'icons'
    'styles'
    'modernizr'
    'scripts'
    'create-versions-file'
    'docs'
    cb
  )

#! Copyright AXA Versicherungen AG 2015
