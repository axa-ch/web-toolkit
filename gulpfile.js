var gulp = require('gulp');

var iconfont = require('gulp-iconfont');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

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
    .listen(process.env.PORT || 3000);
});

gulp.task('reload-docs', function (cb) {
  var server = livereload();

  gulp.watch('./dist/docs/**').on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('develop-docs', function (cb) {
  runSequence([
    'watch-docs',
    'serve-docs',
    'reload-docs'
  ], cb);
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
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('coffee', function (cb) {
  gulp.src('./coffee/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('combine-coffee', ['coffee'], function (cb) {
  gulp.src('./dist/js/*.js')
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(concat('style.all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', []);
