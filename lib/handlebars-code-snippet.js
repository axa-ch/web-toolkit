import handlebars from 'handlebars'
import hljs from 'highlight.js'

function codeSnippet(language, opts) {
  if (!opts) {
    throw new handlebars.Exception('Must pass language to the "code-snippet" helper.')
  }

  let markup = opts.fn(this)

  // Remove leading lines that are empty
  // Usecase: If the snippet is from a hbs-template with frontmatter it'll
  // have an empty line with 6 leading blanks. While the actual content
  // will usually start on the 2nd line with a different indentation.
  let lines = markup.split('\n')
  while ((lines[0]) && lines[0].trim().length <= 0) {
    lines.splice(0, 1)
  }

  // Very basic removal of indentation, reading the amount of spaces in
  // the first line to remove that amount for every following line
  let charsToRemove = 0
  let firstLine = null
  if ((firstLine = lines[0])) {
    const spaces = firstLine.match(/\s*/)
    charsToRemove = spaces.length > 0 ? spaces[0].length : 0
  }

  //Remove the number of evaluated characters on each line if they're blanks
  lines = lines.map(line => line.startsWith(' '.repeat(charsToRemove))
    ? line.substr(charsToRemove)
    : line)
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
