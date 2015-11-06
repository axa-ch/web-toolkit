runSequence = require 'run-sequence'

module.exports = (cb) ->
  # TODO: parellel (without docs)?
  runSequence(
    'clean'
    'images'
    'icons'
    'icons-copy'
    'icons-svg'
    'styles'
    'modernizr'
    'scripts'
    'ng'
    'create-versions-file'
    'docs'
    cb
  )

#! Copyright AXA Versicherungen AG 2015
