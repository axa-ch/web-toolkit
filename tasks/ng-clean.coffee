del = require 'del'

module.exports = (cb) ->
  del [ './dist/ng/**' ], cb

# Copyright AXA Versicherungen AG 2015
