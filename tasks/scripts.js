import runSequence from 'run-sequence'

module.exports = cb => runSequence(
  'scripts-transpile',
  'scripts-bundle',
  'scripts-webpack',
  'scripts-happypack',
  cb)

//! Copyright AXA Versicherungen AG 2016
