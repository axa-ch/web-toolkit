var gulp = require('gulp');
var docs = require('./gulp/docs');

gulp.task('docs', docs({
  cwd: __dirname,
  src: './docs',
  dest: './dist/docs'
}));

gulp.task('watch-docs', function (cb) {
  gulp.watch('./docs/**', ['docs']);
});

gulp.task('default', []);
