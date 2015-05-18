runAndWatch = require '../lib/run-and-watch'

module.exports = [
  [
    'jquery-clean'
  ],
  (cb) ->

    runAndWatch [
      './jquery/**/*'
    ], [
      'jquery-compile',
      'jquery-compress'
    ],
    cb

]

# Copyright AXA Versicherungen AG 2015
