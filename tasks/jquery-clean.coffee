del = require 'del'

module.exports = (cb) ->
  del [ './dist/jquery/*' ], cb

# Copyright AXA Versicherungen AG 2015
