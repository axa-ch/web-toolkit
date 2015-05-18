del = require 'del'

module.exports = (cb) ->
  del [ './dist/{less,css}/**/*' ], cb

# Copyright AXA Versicherungen AG 2015
