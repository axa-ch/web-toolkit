import hljs from 'highlight.js';
import highlightCode from './jade-filter-highlightcode';

// Simple 'fallback' for metalsmith-relative
let relative = to => to;

export default function(jadeLang, jadeRuntime, jadeFilters) {
  let sampleIndex = 0;

  let template = [
    '.example!= sample',
    '.highlight',
    '  pre.highlight__listing.hljs: code(class=lang)!= htmlSource'
  ].join('\n');

  return function(text, options) {
    sampleIndex++;

    let sampleNonPretty = jadeLang.render(text, {pretty: false, relative});

    let htmlSource = highlightCode(jadeLang, jadeRuntime, jadeFilters)(text);

    return jadeLang.render(template, {
      pretty: true,
      index: sampleIndex,
      sample: sampleNonPretty,
      htmlSource,
      lang: options.lang
    }
    );
  };
};

//! Copyright AXA Versicherungen AG 2015
