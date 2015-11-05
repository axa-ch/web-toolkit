runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence [
      'docs-pages',
      'docs-scripts',
      'docs-styles',
      'docs-assets'
    ],
    cb

#! Copyright AXA Versicherungen AG 2015
