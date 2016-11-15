import handlebars from 'handlebars'
import hljs from 'highlight.js'
import os from 'os'
import uuid from 'node-uuid'

function codeSnippet(language, opts) {
  if (!opts) {
    throw new handlebars.Exception('Must pass language to the "code-snippet" helper.')
  }

  // Get the markup enclosed in the helper
  let markup = opts.fn(this)

  // Split the markup into lines, to do some cleanup magic
  let lines = markup.split(os.EOL)

  // Remove leading lines that are empty
  // Usecase: If the snippet is from a hbs-template with frontmatter it'll
  // have an empty line with 6 leading blanks. While the actual content
  // will usually start on the 2nd line with a different indentation.
  while (lines[0] && lines[0].trim() === '') {
    lines.splice(0, 1)
  }

  // Very basic removal of indentation, by reading the amount of spaces in
  // the first line to remove that same amount for every following line
  let numOfCharsToRemove = 0
  const firstLine = lines[0]

  if (firstLine) {
    // Get leading spaces and tabs from the first line
    const spaces = firstLine.match(/\s*/)

    // The amount of space-like characters to remove
    numOfCharsToRemove = spaces.length > 0 ? spaces[0].length : 0
  }

  const spacesToRemove = ' '.repeat(numOfCharsToRemove)

  // Remove the number of evaluated characters on each line if they're blanks
  lines = lines.map(line => (line.startsWith(spacesToRemove)
    ? line.substr(numOfCharsToRemove)
    : line))

  // Combine all lines again
  markup = lines.join(os.EOL)

  const clipboardId = `clipboard-${uuid.v4()}`

  const highlighted = hljs.highlight(language, markup)

  return new handlebars.SafeString([
    '<figure class="docs-code-snippet">',
    `<button class="docs-code-snippet-copy" data-clipboard-target="#${clipboardId}">Copy</button>`,
    '<pre id="', clipboardId, '">',
    highlighted.value,
    '</pre>',
    '</figure>',
  ].join(''))
}

export default codeSnippet
