gulp = require 'gulp'

path = require 'path'

styles = require '../lib/styles'

module.exports = ->

  return styles([
      './docs/less/docs.less'
    ],
    [
      path.join __dirname, '../dist/less'
      path.join __dirname, '../docs/less'
    ],
    './dist/docs/css'
  )

#! Copyright AXA Versicherungen AG 2015
