runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence 'release-npm', 'release-dist', cb

# Copyright AXA Versicherungen AG 2015
