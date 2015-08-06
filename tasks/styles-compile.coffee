styles = require '../lib/styles'

module.exports = ->

  return styles [ './dist/less/{style,normalize}.less' ], [ './dist/less' ], './dist/css'

#! Copyright AXA Versicherungen AG 2015
