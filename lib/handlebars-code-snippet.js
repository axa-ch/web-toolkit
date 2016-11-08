import handlebars from 'handlebars'
import hljs from 'highlight.js'

function codeSnippet(language, opts) {
  if (!opts) {
    throw new handlebars.Exception('Must pass language to the "code-snippet" helper.')
  }

  // Get the markup enclosed in the helper
  let markup = opts.fn(this)

  // Very basic removal of indentation, by reading the amount of spaces in
  // the first line to remove that same amount for every following line

  let lines = markup.split('\n')
  let numOfCharsToRemove = 0
  const firstLine = lines[0]

  if (firstLine) {
    // Get leading spaces and tabs from the first line
    const spaces = firstLine.match(/\s*/)

    // The amount of space-like characters to remove
    numOfCharsToRemove = spaces.length > 0 ? spaces[0].length : 0
  }

  lines = lines.map(line => line.substr(numOfCharsToRemove))

  // Combine all lines again
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
