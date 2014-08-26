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
  metalsmith.clean(true);

  metalsmith.use(function (files, metalsmith, done) {
    var filtered = [];

    for (var file in files) {
      console.log(files[file]);
      if (files[file].collection !== undefined) {
        filtered.push(files[file]);
      }
    }

    return jade({
      pretty: true,
      locals: metalsmith.metadata()
    })(filtered, metalsmith, done);
  });

  metalsmith.use(collections({
    visuals: {}
  }));

  metalsmith.use(jade({
    pretty: true,
    locals: metalsmith.metadata()
  }));

  /*metalsmith.use(templates({
    engine: 'jade',
    directory: './src/docs/layouts',
    pretty: true
  }));*/

  metalsmith.destination('./dist/docs');

  return metalsmith.build(function (err) {
    if (err) return cb(err);
    var m = metalsmith.metadata();
    console.log(m);
    cb();
  });
});

gulp.task('default', []);
