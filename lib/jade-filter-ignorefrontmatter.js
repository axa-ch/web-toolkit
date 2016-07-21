import hljs from 'highlight.js';
import fm from 'front-matter';
import path from 'path';

// Simple 'fallback' for metalsmith-relative
let relative = to => to;

// basedir for includes
let basedir = path.join(__dirname, '../docs/page');

export default (jadeLang, jadeRuntime, jadeFilters) =>
  function(text, options) {
  	// Remove front matter
    let file = fm(text);

    // Render
    let html = jadeLang.render(file.body, {pretty: true, relative, basedir});

    return html;
  }
;

//! Copyright AXA Versicherungen AG 2015
