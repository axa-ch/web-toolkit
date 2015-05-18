del = require 'del'

# TODO: make docs-*-clean
module.exports = (cb) ->
  del [ './dist/docs/**/*' ], cb

# Copyright AXA Versicherungen AG 2015
