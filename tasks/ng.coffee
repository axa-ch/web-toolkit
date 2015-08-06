runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence 'ng-compile', cb

#! Copyright AXA Versicherungen AG 2015
