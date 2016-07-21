import gulp from 'gulp'

export default () =>

  gulp.src(['icons/**/*.svg'])
    .pipe(gulp.dest('./dist/icons/'))

//! Copyright AXA Versicherungen AG 2015
