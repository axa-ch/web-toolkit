import gulp from 'gulp'

module.exports = [
  [
    'images-clean',
  ],
  () =>
    gulp.src(['./images/**/*'], { base: './images' })
      .pipe(gulp.dest('./dist/images')),
]

//! Copyright AXA Versicherungen AG 2015
