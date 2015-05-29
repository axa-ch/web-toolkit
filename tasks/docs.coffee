runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence [
      'docs-pages',
      'docs-scripts',
      'docs-example-scripts',
      'docs-inspiration-scripts',
      'docs-styles',
      'docs-assets'
    ],
    cb


# Copyright AXA Versicherungen AG 2015
