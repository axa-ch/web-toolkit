import hljs from 'highlight.js'
import pug from 'pug'
import fm from 'front-matter'
import handlebars from 'handlebars'

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
  if (options.renderHandlebars) {
    const fmData = fm(text)
    let template = handlebars.compile(fmData.body)
    const context = {
      filename: options.filename
    }
    Object.assign(context, fmData.attributes)
    text = template(context)
  }

  return hljs.highlightAuto(text).value
}

export default highlightCode

//! Copyright AXA 2016
