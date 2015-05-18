gulp = require 'gulp'

runAndWatch = require '../lib/run-and-watch'

module.exports = [
  [
    'images-clean'
  ],
  (cb) ->

    runAndWatch [
      './images/**/*'
    ],
    [
      'images-copy'
    ],
    cb
]


# Copyright AXA Versicherungen AG 2015
