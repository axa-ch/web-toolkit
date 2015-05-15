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
      icons: readJSONFile(path.join(options.cwd, 'tmp/icons.json')),
      colors: readJSONFile(path.join(options.cwd, 'less/colors.json')),
      version: readJSONFile(path.join(options.cwd, 'tmp/version.json')),
      package: readJSONFile(path.join(options.cwd, 'package.json')),
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

    // include jquery files
    metalsmith.use(assets({
      source: './dist/jquery',
      destination: './js'
    }));

    // include js libs
    metalsmith.use(assets({
      source: './node_modules/jquery/dist',
      destination: './js/jquery'
    }));
    metalsmith.use(assets({
      source: './node_modules/moment/min',
      destination: './js/moment'
    }));
    metalsmith.use(assets({
      source: './node_modules/localforage/dist',
      destination: './js/localforage'
    }));
    metalsmith.use(assets({
      source: './node_modules/knockout/build/output',
      destination: './js/knockout'
    }));
    metalsmith.use(assets({
      source: './node_modules/URIjs/src',
      destination: './js/urijs'
    }));
    metalsmith.use(assets({
      source: './node_modules/zeroclipboard/dist',
      destination: './js/zeroclipboard'
    }));

    // do the static pages
    // TODO: Remove when collection plugin supports undeclared collections
    var collections_options = {};
    [
      'nav',
      'nav__fundamentals',
      'nav__fundamentals__layout',
      'nav__fundamentals__design',
      'nav__fundamentals__code',
      'nav__components',
      'nav__components__form',
      'nav__patterns',
      'nav__inspiration'
    ].forEach(function (name) {
      collections_options[name] = { sortBy: 'order', reverse: false };
    });

    metalsmith.use(branch('**/*.md', '!_*/**/*.md')
      .use(relative())
      .use(collections(collections_options))
      .use(markdown({
        renderer: markedRenderer,
        langPrefix: '',
        highlight: function (code, lang) {
          return require('highlight.js').highlight(lang, code).value;
        },
        useMetadata: true
      })));

    // Configure marked to use custom highlight
    require('marked').setOptions({
      renderer: markedRenderer,
      langPrefix: '',
      highlight: function (code, lang) {
        return require('highlight.js').highlight(lang, code).value;
      }
    });

    // TODO: use **/*.jade
    metalsmith.use(branch(['**/*.jade', '!_*/**/*.jade', '!layouts/**/*.jade'])
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

    // do the ng scripts
//    metalsmith.use(assets({
//      source: './docs/ng/',
//      destination: './ng'
//    }));
//    metalsmith.use(assets({
//      source: './ng/',
//      destination: './ng'
//    }));

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
/* Copyright AXA Versicherungen AG 2015 */
