var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var merge = require('merge-stream');
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
var template = require('gulp-template');
var rename = require("gulp-rename");
var git = require('gulp-git');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

var readJSONFile = require('./lib/readJSONFile');
var errorify = require('./lib/errorify');
var file = require('./lib/file');
var after = require('./lib/after');

var config = require('./package.json');
var docs = require('./tasks/docs');

gulp.task('clean', function (cb) {
  del(['./dist/**/*'], cb);
});

gulp.task('docs', docs({
  cwd: __dirname,
  src: './docs',
  dest: './dist/docs'
}));

gulp.task('icons', function (cb) {
  // Notify execution end on second call, when...
  // * icons.json file is written
  // * fonts are created
  var end = after(2, function (err) {
    cb(err);
  }, function (err) {
    if (err) cb(err);
  });

  gulp.src(['./icons/*.svg'])
    .pipe(iconfont({
      fontName: 'style-guide-font',
      appendCodepoints: true
    }))
    .on('error', errorify)
    .on('codepoints', function (points) {
      var glyphs = [];

      points.forEach(function (point) {
        glyphs.push({
          name: point.name,
          codepoint: point.codepoint.toString(16).toUpperCase()
        });
      });

      var contents = new Buffer(JSON.stringify(glyphs, null, 2));

      file('icons.json', contents)
        .pipe(gulp.dest('./dist'))
        .on('end', end);
    })
    .pipe(gulp.dest('./dist/fonts'))
    .on('end', end);
});

gulp.task('images', function () {
  return gulp.src(['./images/**'], { base: './images' })
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('styles-copy', function () {
  return gulp.src(['./less/**/*.less'], { base: './less' })
    .pipe(gulp.dest('./dist/less'));
});

gulp.task('styles-generate', function (cb) {
  gulp.src(['./icons/*.svg'])
    .pipe(iconfont({ fontName: 'temporary' }))
    .on('error', errorify)
    .on('codepoints', function (codepoints) {
      gulp.src('./less/style/blocks/icon.less.lodash', { base: './less' })
        .pipe(template({ glyphs: codepoints }))
        .on('error', errorify)
        .pipe(rename('style/blocks/icon.less'))
        .pipe(gulp.dest('./dist/less'))
        .on('end', function() {
          cb();
        });
    });
});

gulp.task('styles-compile', function () {
  return gulp.src(['./dist/less/{style,normalize}.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: ['./dist/less']
    }))
    .on('error', errorify)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('styles-generate-variables', function () {
  return gulp.src('./less/style/variables.less.lodash')
    .pipe(template({ colors: readJSONFile('./less/colors.json') }))
    .pipe(rename('./less/style/variables.less'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles-generate-grid', function () {
  return gulp.src('./less/style/grid.less.lodash')
    .pipe(template({}))
    .pipe(rename('./less/style/grid.less'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles-copy-colors', function () {
  return gulp.src('./less/colors.json')
    .pipe(rename('./colors.json'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles-autoprefix', function() {
  return gulp.src(['./dist/css/*.css'])
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .on('error', errorify)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('styles', function (cb) {
  runSequence(
    'styles-copy', 'styles-generate', 'styles-generate-variables',
    'styles-generate-grid',
    'styles-copy-colors', 'styles-compile', 'styles-autoprefix', cb);
});

gulp.task('scripts-clean', function (cb) {
  del(['./dist/js/**'], cb);
});

gulp.task('scripts-compile', function () {
  return gulp.src('./coffee/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .on('error', errorify)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts-combine', function () {
  return gulp.src(['./dist/js/*.js', '!./dist/js/*.all.js'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat('style.all.js'))
    .on('error', errorify)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts', function (cb) {
  runSequence('scripts-clean', 'scripts-compile', 'scripts-combine', cb);
});

gulp.task('build', function (cb) {
  runSequence('icons', 'images', 'styles', 'scripts', 'docs', cb);
});

gulp.task('serve', function (next) {
  connect()
    .use(serveStatic('./dist/docs'))
    .listen(process.env.PORT || 3000, next);
});

gulp.task('dev', ['build', 'serve'], function () {
  livereload.listen();

  watch([
    './docs/**',
    './less/**',
    './icons/**',
    './coffee/**'
  ], function (files, callback) {
    runSequence('build', function (arguments) {
      livereload.changed();
      callback.apply(this, arguments);
    });
  });
});

gulp.task('deploy-clean', function (cb) {
  del(['./out'], cb);
});

gulp.task('deploy-copy', function () {
  return gulp.src('./dist/docs/**')
    .pipe(gulp.dest('./out'));
});

gulp.task('deploy-init', function (cb) {
  git.init({ args: '--quiet', cwd: './out' }, cb);
});

gulp.task('deploy-config', function (cb) {
  git.addRemote('deploy', config.repository.url, {
    cwd: './out'
  }, cb);
});

gulp.task('deploy-add', function () {
  return gulp.src('./*', { cwd: './out' })
    .pipe(git.add({ cwd: './out' }));
});

gulp.task('deploy-commit', function () {
  return gulp.src('./*', { cwd: './out' })
    .pipe(git.commit('Deploy to GitHub Pages', {
      args: '--author="Robo Coder <robo@coder>"',
      cwd: './out'
    }));
});

gulp.task('deploy-push', function (cb) {
  git.push('deploy', 'master:gh-pages', {
    args: '--force',
    cwd: './out'
  }, cb).end();
});

gulp.task('deploy', function (cb) {
  runSequence(
    'deploy-clean', 'deploy-copy', 'deploy-init',
    'deploy-config', 'deploy-add', 'deploy-commit', 'deploy-push', cb);
});

gulp.task('default', ['build']);
