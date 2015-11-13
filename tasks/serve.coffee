gulp = require 'gulp'
webserver = require 'gulp-webserver'

module.exports = (cb) ->
  gulp.src(['dist/docs'])
    .pipe(webserver({
      host: '0.0.0.0',
      port: process.env.PORT or 3000
    }))

  # return nothin and don't call cb since this task runs "forever"
  return

#! Copyright AXA Versicherungen AG 2015
