gulp = require 'gulp'
$ = require('gulp-load-plugins')()

module.exports = ->
  gulp.src [ './*' ], cwd: './out'
    .pipe $.git.commit(
      'Deploy to GitHub Pages',
      args: '--author="Robo Coder <robo@coder>"'
      cwd: './out'
    )

# Copyright AXA Versicherungen AG 2015
