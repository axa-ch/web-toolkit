$ = require('gulp-load-plugins')()

runSequence = require 'run-sequence'

module.exports = [
  [
    'build'
    'serve'
  ],
  ->

    $.livereload.listen()

    $.watch [
      './docs/**'
      './less/**'
      './icons/**'
      './images/**'
      './jquery/**'
      './ng/**'
    ], (files, callback) ->
      runSequence 'build', (args) ->
        $.livereload.changed()
        callback.apply this, args

]

# Copyright AXA Versicherungen AG 2015
