import runSequence from 'run-sequence'

module.exports = cb =>
  runSequence(
    'styles-copy',
    'styles-compile',
    cb)

//! Copyright AXA Versicherungen AG 2015
