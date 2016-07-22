import gulp from 'gulp'
import webserver from 'gulp-webserver'

export default () => gulp.src(['dist/docs'])
  .pipe(webserver({
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    middleware(req, res, next) {
      // make /global.html accessible on /global
      if (req.url && req.url === '/global') {
        req.url = '/global.html'
      }
      return next()
    },
  }))

//! Copyright AXA Versicherungen AG 2015
