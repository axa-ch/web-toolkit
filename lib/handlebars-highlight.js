import handlebars from 'handlebars'
import hljs from 'highlight.js'

const highlight = function(opts) {
  const markup = opts.fn(this).trim()
  const highlighted = hljs.highlight('html', markup)

  return new handlebars.SafeString(highlighted.value)
}

export default highlight