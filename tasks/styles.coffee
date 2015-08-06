runSequence = require 'run-sequence'

module.exports = (cb) ->

  runSequence 'styles-copy', 'styles-icons', 'styles-variables', 'styles-compile', cb

#! Copyright AXA Versicherungen AG 2015
