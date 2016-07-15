import gulp from 'gulp'
import webserver from 'gulp-webserver'

module.exports = () => gulp.src(['dist/docs'])
  .pipe(webserver({
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  }))

//! Copyright AXA Versicherungen AG 2015
