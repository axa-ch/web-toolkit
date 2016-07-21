import runSequence from 'run-sequence'

export default cb => runSequence('scripts-transpile', 'scripts-bundle', cb)

//! Copyright AXA Versicherungen AG 2016
