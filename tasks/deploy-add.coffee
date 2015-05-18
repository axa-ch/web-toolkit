gulp = require 'gulp'
$ = require('gulp-load-plugins')()

module.exports = ->
  gulp.src [ './*' ], cwd: './out'
    .pipe $.git.add { cwd: './out' }

# Copyright AXA Versicherungen AG 2015
