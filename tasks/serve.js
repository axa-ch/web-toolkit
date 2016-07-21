import gulp from 'gulp';
import webserver from 'gulp-webserver';

export default function(cb) {
  gulp.src(['dist/docs'])
    .pipe(webserver({
      host: '0.0.0.0',
      port: process.env.PORT || 3000,
      middleware(req, res, next) {
        // make /global.html accessible on /global
        if (req.url && req.url === '/global') {
          req.url = '/global.html';
        }
        return next();
      }
    }));

  // return nothin and don't call cb since this task runs "forever"
};

//! Copyright AXA Versicherungen AG 2015
