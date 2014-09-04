var gulp = require('gulp');

var iconfont = require('gulp-iconfont');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

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

gulp.task('less', function (cb) {
  gulp.src(['less/style.less', 'less/normalize.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: []
    }))
    .on('error', cb)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', []);
