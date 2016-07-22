import fm from 'front-matter'
import path from 'path'

// Simple 'fallback' for metalsmith-relative
const relative = to => to

// basedir for includes
const basedir = path.join(__dirname, '../docs/page')

const ignoreFrontMatter = (jadeLang) =>
  (text) => {
    // Remove front matter
    const file = fm(text)

    // Render
    const html = jadeLang.render(file.body, {
      pretty: true,
      relative,
      basedir,
    })

    return html
  }

export default ignoreFrontMatter

//! Copyright AXA Versicherungen AG 2015
