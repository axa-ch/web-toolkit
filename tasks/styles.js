import runSequence from 'run-sequence'

export default cb => runSequence('styles-copy', 'styles-variables', 'styles-compile', cb)

//! Copyright AXA Versicherungen AG 2015
