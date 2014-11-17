/**
 * @file The Metalsmith workflow that builds our docs.
 */

module.exports = exports = function (options) {
  var path = require('path');
  var options = options || {};

  options.cwd = options.cwd || './';
  options.src = options.src || './src';
  options.dest = options.dest || './dest';

  return function (cb) {
    var readJSONFile = require('../lib/readJSONFile');
    var sampleJadeFilter = require('../lib/sampleJadeFilter');

    var Metalsmith = require('metalsmith');
    var collections = require('metalsmith-collections');
    var templates = require('metalsmith-templates');
    var jade = require('metalsmith-jade');
    var ignore = require('metalsmith-ignore');
    var branch = require('metalsmith-branch');
    var less = require('metalsmith-less');
    var define = require('metalsmith-define');
    var assets = require('metalsmith-assets');
    var autoprefixer = require('metalsmith-autoprefixer');
    var coffee = require('metalsmith-coffee');

    var config = readJSONFile(path.join(options.src, 'config.json'));

    // GitHub integration
    if (!process.env.GITHUB_INTEGRATION) {
      config.github = null;
    }

    // Jade filters
    jade.registerFilter('sample', sampleJadeFilter);

    var metalsmith = new Metalsmith(options.cwd);
    metalsmith.source(options.src);

    // add metadata
    metalsmith.use(define({
      icons: readJSONFile(path.join(options.cwd, 'dist/icons.json')),
      colors: readJSONFile(path.join(options.cwd, 'dist/colors.json')),
      version: readJSONFile(path.join(options.cwd, 'dist/version.json')),
      config: config
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

    [
      'visuals',
      'mixins',
      'interactions'
    ].forEach(function (name) {
      // TODO: Remove when collection plugin supports undeclared collections
      var options = {};
      options[name] = { sortBy: 'slug', reverse: false };

      metalsmith.use(branch(name + '/*.jade')
        .use(jade({ locals: metalsmith.metadata() }))
        .use(collections(options))
        .use(ignore(name + '/*.jade')));
    });

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

    // do the scripts
    metalsmith.use(coffee());

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
