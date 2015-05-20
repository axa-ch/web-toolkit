del = require 'del'

module.exports = (cb) ->
  del [ './dist/images/**/*' ], cb

# Copyright AXA Versicherungen AG 2015
