var gulp = require('gulp');

var iconfont = require('gulp-iconfont');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

var docs = require('./tasks/docs');

gulp.task('docs', docs({
  cwd: __dirname,
  src: './docs',
  dest: './dist/docs'
}));

gulp.task('watch-docs', function (cb) {
  gulp.watch('./docs/**', ['docs']);
});

gulp.task('serve-docs', function (cb) {
  var connect = require('connect');
  var serveStatic = require('serve-static');

  connect()
    .use(serveStatic('./dist/docs'))
    .listen(process.env.PORT || 3000, cb);
});

gulp.task('develop-docs', ['serve-docs'], function (cb) {
  var server = livereload();

  gulp.watch('./dist/docs/**').on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('icons', function (cb) {
  gulp.src(['./icons/*.svg'])
    .pipe(iconfont({
      fontName: 'style-guide-font',
      appendCodepoints: true
    }))
    .on('codepoints', function(codepoints) {
      console.log(codepoints);
    })
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('less', function (cb) {
  gulp.src(['./less/style.less', './less/normalize.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: ['less']
    }))
    .on('error', cb)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', []);
