import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import svgstore from 'gulp-svgstore'
import cached from 'gulp-cached'
import remember from 'gulp-remember'

module.exports = () =>
  gulp.src(['icons/**/*.svg'])
    .pipe(cached('icons'))
    .pipe(svgmin())
    .pipe(remember('icons'))
    .pipe(svgstore())
    .pipe(gulp.dest('./dist/images/'))
    .pipe(gulp.dest('./dist/docs/images/'))

//! Copyright AXA Versicherungen AG 2015
