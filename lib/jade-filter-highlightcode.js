import hljs from 'highlight.js'
import pug from 'pug'
import fm from 'front-matter'

const highlightCode = (text, options)  => {
  const relative = to => to

  if (options.renderPug) {
    text = fm(text).body
    text = pug.render(text, {
      relative: relative,
      filename: options.filename,
      pretty: true,
    })
  }

  return hljs.highlightAuto(text).value
}

export default highlightCode

//! Copyright AXA 2016
