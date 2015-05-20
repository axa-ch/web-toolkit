runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence 'jquery-compile', 'jquery-compress', cb

# Copyright AXA Versicherungen AG 2015
