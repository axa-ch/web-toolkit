runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence 'ng-clean', 'ng-compile', cb

# Copyright AXA Versicherungen AG 2015
