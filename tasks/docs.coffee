runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence 'docs-clean', [
      'docs-pages',
      'docs-scripts',
      'docs-styles',
      'docs-assets'
    ],
    cb


# Copyright AXA Versicherungen AG 2015
