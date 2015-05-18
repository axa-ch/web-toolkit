$ = require('gulp-load-plugins')()

runSequence = require 'run-sequence'

module.exports = (cb) ->

  process.env.WATCH = true;

  runSequence ['build', 'serve']

# Copyright AXA Versicherungen AG 2015
