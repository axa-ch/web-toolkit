import runSequence from 'run-sequence'

module.exports = cb => runSequence(
  'scripts-transpile',
  'scripts-bundle',
  'scripts-webpack',
  cb)

//! Copyright AXA Versicherungen AG 2016
