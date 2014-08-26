var gulp = require('gulp');
var bg = require('gulp-bg');
var docs = require('./gulp/docs');

gulp.task('docs', docs({
  cwd: __dirname,
  src: './src/docs',
  dest: './dist/docs'
}));

gulp.task('watch-docs', function (cb) {
  gulp.watch('./src/docs/**', ['docs']);
});

gulp.task('default', []);
