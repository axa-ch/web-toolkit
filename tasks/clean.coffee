del = require 'del'

module.exports = (cb) ->
  del [ './dist/**/*' ], cb

#! Copyright AXA Versicherungen AG 2015
