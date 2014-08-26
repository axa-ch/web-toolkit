var gulp = require('gulp');

gulp.task('docs', function (cb) {
  var Metalsmith = require('metalsmith'),
      collections = require('metalsmith-collections'),
      templates = require('metalsmith-templates'),
      jade = require('metalsmith-jade'),
      ignore = require('metalsmith-ignore'),
      branch = require('metalsmith-branch');

  var metalsmith = new Metalsmith(__dirname);
  metalsmith.source('./src/docs');

  // put the visuals to metadata
  metalsmith.use(branch('visuals/*.jade')
      .use(jade({ locals: metalsmith.metadata() }))
      .use(collections({ visuals: 'visuals/*' }))
      .use(ignore('visuals/*')));

  // do the static pages
  metalsmith.use(branch('*.jade')
      .use(jade({ locals: metalsmith.metadata() }))
      .use(templates({
          engine: 'jade',
          directory: './src/docs/layouts'
      })));

  // we no need the layouts
  metalsmith.use(ignore('layouts/*'));

  metalsmith.destination('./dist/docs');

  return metalsmith.build(function (err) {
    if (err) return cb(err);
    var m = metalsmith.metadata();
    cb();
  });
});

gulp.task('default', []);
