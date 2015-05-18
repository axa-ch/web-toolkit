runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence(
    'ng-clean',
    'ng-copy',
    'ng-scripts',
    cb
  )

# Copyright AXA Versicherungen AG 2015
