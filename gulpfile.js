var gulp = require('gulp');

var iconfont = require('gulp-iconfont');
var sass = require('gulp-sass');

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

gulp.task('sass', function (cb) {
  gulp.src(['scss/style.scss', 'scss/normalize.scss'])
    .pipe(sass())
    .on('error', cb)
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', []);
