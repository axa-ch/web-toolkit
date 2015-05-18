connect = require 'connect'
serveStatic = require 'serve-static'

module.exports = (cb) ->
  connect().use(serveStatic('./dist/docs')).listen process.env.PORT or 3000, cb

# Copyright AXA Versicherungen AG 2015
