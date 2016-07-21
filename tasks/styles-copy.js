import gulp from 'gulp';

export default () =>

  gulp.src([ './less/**/*.less' ], { base: './less' })
    .pipe(gulp.dest('./dist/less'))
;

//! Copyright AXA Versicherungen AG 2015
