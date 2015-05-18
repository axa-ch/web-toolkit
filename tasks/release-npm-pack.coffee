npm = require 'npm'

module.exports = (cb) ->
  npm.load {} , ->
    npm.commands.pack [ './' ], cb

# Copyright AXA Versicherungen AG 2015
