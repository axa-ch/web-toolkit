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
    var markedRenderer = require('../lib/markedRenderer');

    var Metalsmith = require('metalsmith');
    var collections = require('metalsmith-collections');
    var templates = require('metalsmith-templates');
    var jade = require('metalsmith-jade');
    var markdown = require('metalsmith-markdown');
    var ignore = require('metalsmith-ignore');
    var branch = require('metalsmith-branch');
    var less = require('metalsmith-less');
    var define = require('metalsmith-define');
    var drafts = require('metalsmith-drafts');
    var assets = require('metalsmith-assets');
    var autoprefixer = require('metalsmith-autoprefixer');
    var coffee = require('metalsmith-coffee');
    var filepath = require('metalsmith-filepath');
    var relative = require('metalsmith-relative');
    var postcss = require('metalsmith-postcss');
    var pseudoelements = require('postcss-pseudoelements');

    var config = readJSONFile(path.join(options.src, 'config.json'));

    // GitHub integration
    if (!process.env.GITHUB_INTEGRATION) {
      config.github = null;
    }

    // Jade filters
    jade.registerFilter('sample', sampleJadeFilter);

    var metalsmith = new Metalsmith(options.cwd);
    metalsmith.source(options.src);

    metalsmith.use(drafts());

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

    // do the static pages
    // TODO: Remove when collection plugin supports undeclared collections
    var collections_options = {};
    [
      'development',
      'development_blocks',
      'development_plugins',
      'development_mixins',
      'design',
      'design_components',
      'design_fundamentals',
      'examples'
    ].forEach(function (name) {
      collections_options[name] = { sortBy: 'slug', reverse: false };
    });

    metalsmith.use(branch('**/*.md')
      .use(relative())
      .use(collections(collections_options))
      .use(markdown({
        renderer: markedRenderer,
        useMetadata: true
      })));

    metalsmith.use(branch(['**/*.jade', '!layout/**/*.jade'])
      .use(relative())
      .use(collections(collections_options))
      .use(jade({ useMetadata: true, locals: metalsmith.metadata() })));

    metalsmith.use(branch(['**/*.html'])
      .use(filepath({ absolute: true }))
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
      .use(postcss([
        pseudoelements()
      ]))
      .use(autoprefixer()));

    // do the scripts
    metalsmith.use(branch('js/*.coffee')
      .use(coffee({
        // Fix an error in metalsmith-coffe, where
        // not all Coffee files are compiled
        filter: function () { return true; }
      })));

    // we no need these files
    metalsmith.use(ignore('layouts/**'));
    metalsmith.use(ignore('less/**'));
    metalsmith.use(ignore('config.json'));

    metalsmith.destination(options.dest);

    return metalsmith.build(function (err) {
      if (err) return cb(err);
      cb();
    });
  };
};
