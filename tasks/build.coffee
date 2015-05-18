runSequence = require 'run-sequence'

module.exports = (cb) ->
  # TODO: parellel (without docs)?
  runSequence(
    'clean',
    'icons',
    'icons-svg',
    'images',
    'styles',
    'jquery',
    'ng',
    'create-versions-file',
    'docs',
    cb
  )

# Copyright AXA Versicherungen AG 2015
