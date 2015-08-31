hljs = require('highlight.js')
highlightCode = require('./jade-filter-highlightcode')

# Simple 'fallback' for metalsmith-relative
relative = (to) ->
  to

module.exports = (jadeLang, jadeRuntime, jadeFilters) ->
  sampleIndex = 0

  template = [
    '.example!= sample'
    '.highlight'
    '  pre.highlight__listing.hljs: code(class=lang)!= htmlSource'
  ].join('\n')

  (text, options) ->
    sampleIndex++

    sampleNonPretty = jadeLang.render(text, pretty: false, relative: relative)

    htmlSource = highlightCode(jadeLang, jadeRuntime, jadeFilters)(text)

    jadeLang.render template,
      pretty: true
      index: sampleIndex
      sample: sampleNonPretty
      htmlSource: htmlSource
      lang: options.lang

#! Copyright AXA Versicherungen AG 2015
