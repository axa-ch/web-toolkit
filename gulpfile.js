// FIXME: Merge docs & assets building tasks as much as possible!

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var connect = require('connect');
var serveStatic = require('serve-static');
var gutil = require('gulp-util');
var clean = require('gulp-clean');

var docs = require('./tasks/docs');

function errorify(e) {
  gutil.beep();
  gutil.log(e);
}

gulp.task('clean', function () {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('docs', docs({
  cwd: __dirname,
  src: './docs',
  dest: './dist/docs'
}));

gulp.task('icons', function () {
  return gulp.src(['./icons/*.svg'])
    .pipe(iconfont({
      fontName: 'style-guide-font',
      appendCodepoints: true
    }))
    .on('error', errorify)
    .on('codepoints', function (codepoints) {
      // FIXME: Create less-file with codepoints here
    })
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('styles', function () {
  return gulp.src(['./less/style.less', './less/normalize.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: ['less']
    }))
    .on('error', errorify)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
  return gulp.src('./coffee/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .on('error', errorify)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(concat('style.all.js'))
    .on('error', errorify)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', function (cb) {
  runSequence(['docs', 'icons', 'scripts', 'styles'], cb);
});

gulp.task('serve', function (next) {
  connect()
    .use(serveStatic('./dist/docs'))
    .listen(process.env.PORT || 3000, next);
});

gulp.task('dev', ['docs', 'serve'], function () {
  livereload.listen();

  watch([
    './docs/**',
    './less/**',
    './icons/**',
    './coffee/**'
  ], function (files, callback) {
    runSequence('docs', function (arguments) {
      livereload.changed();
      callback.apply(this, arguments);
    });
  });
});

gulp.task('default', ['build']);
