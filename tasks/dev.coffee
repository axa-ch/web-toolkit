$ = require('gulp-load-plugins')()

runSequence = require 'run-sequence'

module.exports = [
  [
    'build'
    'serve'
  ],
  ->

    $.watch [
      './docs/**'
      './less/**'
      './icons/**'
      './images/**'
      './jquery/**'
      './ng/**'
    ], (files, callback) ->
      runSequence 'build'

]

# Copyright AXA Versicherungen AG 2015
