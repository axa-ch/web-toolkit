import hljs from 'highlight.js'
import highlightCode from './jade-filter-highlightcode'

// Simple 'fallback' for metalsmith-relative
const relative = to => to

const template = `.example!= sample
.highlight
  pre.highlight__listing.hljs: code(class=lang)!= htmlSource`

const sample = (jadeLang, jadeRuntime, jadeFilters) => {
  let sampleIndex = 0

  return (text, options) => {
    sampleIndex++

    const sampleNonPretty = jadeLang.render(text, {
      pretty: false,
      relative,
    })

    const htmlSource = highlightCode(jadeLang, jadeRuntime, jadeFilters)(text)

    return jadeLang.render(template, {
      pretty: true,
      index: sampleIndex,
      sample: sampleNonPretty,
      htmlSource,
      lang: options.lang,
    })
  }
}

export default sample

//! Copyright AXA Versicherungen AG 2015
