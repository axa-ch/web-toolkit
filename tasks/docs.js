import runSequence from 'run-sequence'

module.exports = cb =>
  runSequence(
    'docs-jsdoc2md',
    [
      'docs-pages',
      'docs-scripts',
      'docs-styles',
      'docs-assets',
    ], cb)

//! Copyright AXA Versicherungen AG 2015
