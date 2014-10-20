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
      icons: readJSONFile(path.join(options.cwd, 'dist/icons.json')),
      colors: readJSONFile(path.join(options.cwd, 'dist/colors.json'))
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

    // jade filters
    jade.registerFilter('sample', function(jade_lang, jade_runtime, jade_filters) {
      var sampleCount = 0;
      var html = '<div class="sample" >\
                    <ul class="sample__header menu menu--tabs tab-panel__header" >\
                      <li class="menu__item">\
                        <a href="#" data-target="#sample_{{sampleCount}}_sample" data-toggle="tab" class="menu__link is-active" >Sample</a>\
                      </li>\
                      <li class="menu__item">\
                        <a href="#" data-target="#sample_{{sampleCount}}_html" data-toggle="tab" class="menu__link" >HTML</a>\
                      </li>\
                      <li class="menu__item">\
                        <a href="#" data-target="#sample_{{sampleCount}}_jade" data-toggle="tab" class="menu__link" >Jade</a>\
                      </li>\
                    </ul>\
                    <div class="sample__body tab-panel__content" >\
                      <div id="sample_{{sampleCount}}_sample" class="tab-panel__tab is-active" >{{sample}}</div>\
                      <div id="sample_{{sampleCount}}_html" class="tab-panel__tab" ><pre class="hljs" ><code class="html" >{{html}}</code></pre></div>\
                      <div id="sample_{{sampleCount}}_jade" class="tab-panel__tab" ><pre class="hljs" ><code class="jade" >{{jade}}</code></pre></div>\
                    </div>\
                  </div>';

      return function(text) {

        sampleCount += 1;

        var sample = jade_lang.render(text, {pretty: true});
        // Cut off first/last blank lines
        sample = sample.replace(/^\n+|\s+$/g, '');
        var src_html = jade_filters('highlight', sample);
        var src_jade = jade_filters('highlight', text);
        // Cut off first/last blank lines
        src_jade = src_jade.replace(/^\n+|\s+$/g, '');

        return html.replace(/{{sampleCount}}/g, sampleCount).replace(/{{sample}}/, sample).replace(/{{html}}/, src_html).replace(/{{jade}}/, src_jade);
      }
    });

    [
      'visuals',
      'mixins',
      'interactions'
    ].forEach(function (name) {
      // TODO: Remove when collection plugin supports undeclared collections
      var options = {};
      options[name] = { sortBy: 'order', reverse: false };

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
