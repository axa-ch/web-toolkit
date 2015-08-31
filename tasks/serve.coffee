gulp = require 'gulp'
webserver = require 'gulp-webserver'

module.exports = (cb) ->
  gulp.src [ './dist/docs' ]
    .pipe webserver
      port: process.env.PORT or 3000
      livereload: true
      open: false

  # return nothin and don't call cb since this task runs "forever"
  return

#! Copyright AXA Versicherungen AG 2015
