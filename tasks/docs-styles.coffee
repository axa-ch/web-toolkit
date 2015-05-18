gulp = require 'gulp'
$ = require('gulp-load-plugins')()

path = require 'path'

runAndWatch = require '../lib/run-and-watch'
styles = require '../lib/styles'

module.exports = ->

  return styles [
      './docs/less/{docs,style}.less'
    ],
    [
      path.join __dirname, '../dist/less'
      path.join __dirname, '../docs/less'
    ],
    './dist/docs/css'
