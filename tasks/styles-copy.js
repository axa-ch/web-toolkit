import gulp from 'gulp'

module.exports = () =>
  gulp.src(['./less/**/*.less'], { base: './less' })
    .pipe(gulp.dest('./dist/less'))

//! Copyright AXA Versicherungen AG 2015
