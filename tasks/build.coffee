runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence(
    'icons',
    'icons-svg',
    'images',
    'styles',
    'jquery',
    'create-versions-file',
    'docs',
    cb
  )

# Copyright AXA Versicherungen AG 2015
