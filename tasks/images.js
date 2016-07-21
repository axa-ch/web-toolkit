import gulp from 'gulp';

export default [
  [
    'images-clean'
  ],
  () =>
    gulp.src([ './images/**/*' ], { base: './images' })
      .pipe(gulp.dest('./dist/images'))
  
];

//! Copyright AXA Versicherungen AG 2015
