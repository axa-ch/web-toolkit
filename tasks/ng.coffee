runSequence = require 'run-sequence'

runAndWatch = require '../lib/run-and-watch'

module.exports = [
  [
    'ng-clean'
  ],
  (cb) ->

    runAndWatch [
      './ng/**/*'
    ], [
      'ng-compile'
    ],
    cb


]

# Copyright AXA Versicherungen AG 2015
