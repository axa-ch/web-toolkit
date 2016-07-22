import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import svgstore from 'gulp-svgstore'

module.exports = () =>
  gulp.src(['icons/**/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest('./dist/images/'))
    .pipe(gulp.dest('./dist/docs/images/'))

//! Copyright AXA Versicherungen AG 2015
