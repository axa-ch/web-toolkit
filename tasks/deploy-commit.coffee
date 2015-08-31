gulp = require 'gulp'
git = require 'gulp-git'

module.exports = ->
  gulp.src [ './*' ], cwd: './out'
    .pipe git.commit(
      'Deploy to GitHub Pages',
      args: '--author="Robo Coder <robo@coder>"'
      cwd: './out'
    )

#! Copyright AXA Versicherungen AG 2015
