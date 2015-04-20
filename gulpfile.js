require('gulp-coffee/node_modules/coffee-script/register')

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
var pseudoelements = require('postcss-pseudoelements');
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
var uglify = require('gulp-uglify');
var coffeelint = require('gulp-coffeelint');
var gulptar = require('gulp-tar');
var gulpgzip = require('gulp-gzip');
var generateBowerJson = require('gulp-generate-bower-json');
var npm = require('npm');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');

var readJSONFile = require('./lib/readJSONFile');
var writeJSONFile = require('./lib/writeJSONFile');
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
        .pipe(gulp.dest('./tmp'))
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

gulp.task('styles-icons', function (cb) {
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
    .pipe(sourcemaps.write('.', {sourceRoot: './'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('styles-generate', function () {
  return gulp.src(['./less/**/*.less.lodash', '!./less/style/blocks/icon.less.lodash'])
    .pipe(template({ colors: readJSONFile('./less/colors.json') }))
    .pipe(rename({ extname: '' }))
    .pipe(gulp.dest('./dist/less/'));
});

/*gulp.task('styles-copy-colors', function () {
  return gulp.src('./less/colors.json')
    .pipe(rename('./colors.json'))
    .pipe(gulp.dest('./tmp/'));
});*/

gulp.task('styles-autoprefix', function() {
  return gulp.src(['./dist/css/*.css'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([ autoprefixer() ]))
    .on('error', errorify)
    .pipe(sourcemaps.write('.', {sourceRoot: './'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('styles-pseudoelements', function() {
  return gulp.src(['./dist/css/*.css'])
    .pipe(postcss([ pseudoelements() ]))
    .on('error', errorify)
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('styles-compress', function() {
  return gulp.src(['./dist/css/{style,normalize}.css'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([ csswring() ]))
    .on('error', errorify)
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(sourcemaps.write('.', {sourceRoot: './'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('styles', function (cb) {
  runSequence(
    'styles-copy', 'styles-icons', 'styles-generate',
    'styles-compile', 'styles-autoprefix',
    'styles-pseudoelements', 'styles-compress', cb);
});

gulp.task('jquery-clean', function (cb) {
  del(['./dist/jquery/**'], cb);
});

gulp.task('jquery-validate', function() {
  return gulp.src('./jquery/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter('default'));
});

gulp.task('jquery-compile', function () {
  return gulp.src('./jquery/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .on('error', errorify)
    .pipe(sourcemaps.write('.', {sourceRoot: './'}))
    .pipe(gulp.dest('./dist/jquery'));
});

gulp.task('jquery-combine', function () {
  return gulp.src(['./dist/jquery/*.js', '!./dist/jquery/*.all.js'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat('axa-wsg.jquery.all.js'))
    .on('error', errorify)
    .pipe(sourcemaps.write('.', {sourceRoot: './'}))
    .pipe(gulp.dest('./dist/jquery'));
});

gulp.task('jquery-compress', function () {
  return gulp.src(['./dist/jquery/*.js'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write('.', {sourceRoot: './'}))
    .pipe(gulp.dest('./dist/jquery'));
});

gulp.task('jquery', function (cb) {
  runSequence('jquery-clean', 'jquery-validate', 'jquery-compile', 'jquery-combine', 'jquery-compress', cb);
});

gulp.task('ng-clean', function (cb) {
  del(['./dist/ng/**'], cb);
});

gulp.task('ng-validate', function() {
  return gulp.src('./ng/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('ng-copy', function() {
  return gulp.src(['./ng/**/*'])
    .pipe(gulp.dest('./dist/ng'));
});

gulp.task('ng-compress', function () {
  return gulp.src(['./dist/ng/**/*.js'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write('.', {sourceRoot: './'}))
    .pipe(gulp.dest('./dist/ng'));
});

gulp.task('ng', function (cb) {
  runSequence('ng-clean', 'ng-validate', 'ng-copy', 'ng-compress', cb)
});

gulp.task('create-versions-file', function (cb) {
  var data = {
    tag: null,
    hash: {
      long: null,
      short: null
    }
  },
  end = after(2, function (err) {

    writeJSONFile('./tmp/version.json', data);

    cb(err);
  }, function (err) {
    if (err) cb(err);
  });

  git.revParse({args:'--short HEAD'}, function (err, hash) {
    data.hash.short = hash;

    end();
  });

  git.revParse({args:'HEAD'}, function (err, hash) {
    data.hash.long = hash;

    end();
  });
});

gulp.task('release-dist-generate-bower-json', function() {
  return gulp.src('./package.json')
    .pipe(generateBowerJson())
    .pipe(gulp.dest('./dist'));
});

gulp.task('release-dist', ['release-dist-generate-bower-json'], function () {
  packageJson = readJSONFile('./package.json');

  return gulp.src(['./dist/**', './README.*', 'LICENSE.*', '!./dist/docs/downloads/**/*'])
    .pipe(gulptar('./axa-web-style-guide-dist-'+packageJson.version+'.tar'))
    .pipe(gulpgzip())
    .pipe(gulp.dest('./dist/docs/downloads/'));
});

gulp.task('release-npm-pack', function (cb) {
  npm.load({}, function ()
  {
    npm.commands.pack(['./'], cb);
  });
});

gulp.task('release-npm-copy', ['release-npm-pack'], function () {
  return gulp.src(['./axa-web-style-guide-*.tgz'])
    .pipe(gulp.dest('./dist/docs/downloads/'));
});

gulp.task('release-npm', ['release-npm-copy'], function () {
  del(['axa-web-style-guide-*.tgz']);
});

gulp.task('release', function(cb) {
  runSequence('release-npm', 'release-dist', cb);
});

gulp.task('build', function (cb) {
  runSequence(
    'icons', 'images', 'styles', 'jquery', 'ng', 'create-versions-file', 'docs', cb);
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
    './images/**',
    './jquery/**',
    './ng/**'
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
  git.addRemote('deploy', (process.env.REPO_URL ? process.env.REPO_URL : config.repository.url), {
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
    'release', 'deploy-clean', 'deploy-copy', 'deploy-init',
    'deploy-config', 'deploy-add', 'deploy-commit', 'deploy-push', cb);
});

gulp.task('default', ['build']);
/* Copyright AXA Versicherungen AG 2015 */
