gulp = require 'gulp'
git = require 'gulp-git'

module.exports = (cb) ->
  git.init {
    args: '--quiet'
    cwd: './out'
  } , cb

# Copyright AXA Versicherungen AG 2015
