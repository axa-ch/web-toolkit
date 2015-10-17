runSequence = require 'run-sequence'

module.exports = (cb) ->

  runSequence 'styles-copy', 'styles-variables', 'styles-compile', cb

#! Copyright AXA Versicherungen AG 2015
