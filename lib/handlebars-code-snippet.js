import handlebars from 'handlebars'
import hljs from 'highlight.js'

function codeSnippet(language, opts) {
  if (!opts) {
    throw new handlebars.Exception('Must pass language to the "code-snippet" helper.')
  }

  let markup = opts.fn(this)

  // Very basic removal of indentation, reading the amount of spaces in
  // the first line to remove that amount for every following line
  let lines = markup.split('\n')
  let charsToRemove = 0
  let firstLine = null

  if ((firstLine = lines[0])) {
    const spaces = firstLine.match(/\s*/)
    charsToRemove = spaces.length > 0 ? spaces[0].length : 0
  }

  lines = lines.map(line => line.substr(charsToRemove))
  markup = lines.join('\n')

  const highlighted = hljs.highlight(language, markup)

  return new handlebars.SafeString([
    '<figure class="docs-code-snippet">',
    '<pre>',
    highlighted.value,
    '</pre>',
    '</figure>',
  ].join(''))
}

export default codeSnippet
