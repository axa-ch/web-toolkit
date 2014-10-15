/**
 * @file The Metalsmith workflow that builds our docs.
 */

function readJSONFile(path) {
  var fs = require('fs');

  var contents = fs.readFileSync(path, {
    encoding: 'utf8'
  });

  return JSON.parse(contents);
}

module.exports = exports = function (options) {
  var path = require('path');
  var options = options || {};

  options.cwd = options.cwd || './';
  options.src = options.src || './src';
  options.dest = options.dest || './dest';

  return function (cb) {
    var Metalsmith = require('metalsmith');
    var collections = require('metalsmith-collections');
    var templates = require('metalsmith-templates');
    var jade = require('metalsmith-jade');
    var ignore = require('metalsmith-ignore');
    var branch = require('metalsmith-branch');
    var less = require('metalsmith-less');
    var metadata = require('metalsmith-metadata');
    var define = require('metalsmith-define');
    var assets = require('metalsmith-assets');
    var autoprefixer = require('metalsmith-autoprefixer');

    var metalsmith = new Metalsmith(options.cwd);
    metalsmith.source(options.src);

    // add metadata from files
    metalsmith.use(metadata({
      config: 'config.json'
    }));

    // add metadata
    metalsmith.use(define({
      icons: readJSONFile(path.join(options.cwd, 'dist/icons.json'))
    }));

    metalsmith.use(define({
      colors: readJSONFile(path.join(options.cwd, 'less/colors.json'))
    }));

    // include fonts
    metalsmith.use(assets({
      source: './dist/fonts',
      destination: './fonts'
    }));

    // include images
    metalsmith.use(assets({
      source: './dist/images',
      destination: './images'
    }));

    // include js files
    metalsmith.use(assets({
      source: './dist/js',
      destination: './js'
    }));

    // put the visuals to metadata
    metalsmith.use(branch('visuals/*.jade')
      .use(jade({ locals: metalsmith.metadata() }))
      .use(collections({ visuals: { pattern: 'visuals/*', sortBy: 'order', reverse: false }}))
      .use(ignore('visuals/*')));

    // put the visuals to metadata
    metalsmith.use(branch('mixins/*.jade')
      .use(jade({ locals: metalsmith.metadata() }))
      .use(collections({ mixins: { pattern: 'mixins/*', sortBy: 'order', reverse: false }}))
      .use(ignore('mixins/*')));

    // put the interactions to metadata
    metalsmith.use(branch('interactions/*.jade')
      .use(jade({ locals: metalsmith.metadata() }))
      .use(collections({ interactions: { pattern: 'interactions/*', sortBy: 'order', reverse: false }}))
      .use(ignore('interactions/*')));

    // do the static pages
    metalsmith.use(branch(['*.jade', 'examples/*.jade'])
      .use(jade({ locals: metalsmith.metadata() }))
      .use(templates({
        engine: 'jade',
        directory: path.join(options.src, 'layouts')
      })));

    // do the styles
    metalsmith.use(branch('less/*')
      .use(less({
        pattern: ['less/docs.less', 'less/style.less'],
        parse: {
          paths: [
            path.join(options.cwd, 'dist/less'),
            path.join(options.cwd, 'docs/less')
          ]
        }
      }))
      .use(autoprefixer()));

    // we no need these files
    metalsmith.use(ignore('layouts/*'));
    metalsmith.use(ignore('less/**'));
    metalsmith.use(ignore('config.json'));

    metalsmith.destination(options.dest);

    return metalsmith.build(function (err) {
      if (err) return cb(err);
      cb();
    });
  };
};
