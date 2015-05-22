gulp = require 'gulp'

module.exports = (cb) ->
  git.init {
    args: '--quiet'
    cwd: './out'
  } , cb

# Copyright AXA Versicherungen AG 2015
