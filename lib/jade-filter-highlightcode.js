import hljs from 'highlight.js'

const highlightCode = (text, options)  => {
  let html = text.replace(/^\n/g, '')

  return hljs.highlightAuto(html).value
}

export default highlightCode

//! Copyright AXA 2016
