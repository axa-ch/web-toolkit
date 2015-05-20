gulp = require 'gulp'
git = require 'gulp-git'

module.exports = ->
  gulp.src [ './*' ], cwd: './out'
    .pipe git.add { cwd: './out' }

# Copyright AXA Versicherungen AG 2015
