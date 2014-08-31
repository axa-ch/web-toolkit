var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var docs = require('./tasks/docs');

gulp.task('docs', docs({
  cwd: __dirname,
  src: './docs',
  dest: './dist/docs'
}));

gulp.task('watch-docs', function (cb) {
  gulp.watch('./docs/**', ['docs']);
});

gulp.task('icons', function (cb) {
  gulp.src(['icons/*.svg'])
    .pipe(iconfont({
      fontName: 'style-guide-font',
      appendCodepoints: true
    }))
    .on('codepoints', function(codepoints) {
      console.log(codepoints);
    })
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', []);
