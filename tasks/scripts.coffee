runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence('scripts-transpile', 'scripts-bundle', cb)

#! Copyright AXA Versicherungen AG 2016
