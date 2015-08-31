del = require 'del'

module.exports = (cb) ->
  del [ './out' ], cb

#! Copyright AXA Versicherungen AG 2015
