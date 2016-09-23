import path from 'path'
import match from 'multimatch'
import jsdoc2markdown from 'jsdoc-to-markdown'

export const jsdoc2md = ({
  source,
  dest,
}) => (files, metalsmith, done) => {

  const fileNames = Object.keys(files)
  const filteredFileNames = match(fileNames, source)

  for (const matchedFileName of filteredFileNames) {
    const doc = jsdoc2markdown.renderSync({
      source: files[matchedFileName].contents.toString(),
      configure: path.resolve(__dirname, '../.jsdocrc'),
    })

    if (doc && doc !== '') {
      console.log('At least some files should have docs', doc)
      const newFileName = dest(matchedFileName)

      files[newFileName] = doc
    }
  }

  return done()
}

export default jsdoc2md
