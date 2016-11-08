import path from 'path'
import _ from 'lodash'
import fs from 'fs'
import handlebars from 'handlebars'

import Metalsmith from 'metalsmith'
import layouts from 'metalsmith-layouts'
import branch from 'metalsmith-branch'
import define from 'metalsmith-define'
import drafts from 'metalsmith-drafts'
import filepath from 'metalsmith-filepath'
import relative from 'metalsmith-relative'
import lunr from 'metalsmith-lunr'
import copy from 'metalsmith-copy'
import ignore from 'metalsmith-ignore'
import watch from 'metalsmith-watch'
import inplace from 'metalsmith-in-place'

import packageJson from '../package.json'
import nav from './metalsmith-nav'
import searchIndexData from './metalsmith-search-index'
import log from './metalsmith-log'
import sassdocData from './metalsmith-sassdoc'

import hbsRelative from './handlebars-relative'
import hbsReplace from './handlebars-replace'
import hbsEquals from './handlebars-eq'
import hbsGet from './handlebars-get'
import hbsCodeSnippet from './handlebars-code-snippet'

const cwd = path.join(__dirname, '../')
const metalsmithSource = './docs'

handlebars.registerHelper('relative', hbsRelative)
handlebars.registerHelper('replace', hbsReplace)
handlebars.registerHelper('eq', hbsEquals)
handlebars.registerHelper('get', hbsGet)
handlebars.registerHelper('code-snippet', hbsCodeSnippet)

// initialize Metalsmith
const metalsmith = new Metalsmith(cwd)
metalsmith.source(metalsmithSource)
metalsmith.use(log('Start metalsmith build!'))

if (process.env.NODE_ENV !== 'production') {
  metalsmith.use(watch({
    paths: {
      // eslint-disable-next-line no-template-curly-in-string
      '${source}/**/*': '**/*',
    },
    livereload: false,
  }))
  metalsmith.use(log('Started watch'))
}

metalsmith.use(ignore(['**/_partials/**']))

metalsmith.use(
  branch([
    'scss2/**/*.scss',
  ])
    .use(sassdocData())
)
metalsmith.use(log('Added sassdoc data'))

// filter all pages with draft set to true in front-matter
metalsmith.use(drafts())
metalsmith.use(log('Excluded draft pages'))

metalsmith.use(
  branch(['**/*.hbs', '**/*.json', '!_layouts/**', '!**/snippets/**'])
    .use(drafts())
    .use(nav())
  )
metalsmith.use(log('Created navigation'))

// add metadata
metalsmith.use(define({
  icons: fs.readdirSync(path.join(cwd, 'icons')).map(file => ({
    name: file.replace(/\.svg$/, ''),
  })),
  package: packageJson,
  process: {
    env: process.env,
  },
}))
metalsmith.use(log('Added metadata to metalsmith build'))

metalsmith.use(
  branch(['**/*.html'])
    .use(relative())
)

metalsmith.use(log('Prepared the html pages'))

metalsmith.use(
  branch(['**/snippets/**/*.hbs'])
    .use(filepath({}))
    // eslint-disable-next-line no-shadow
    .use((files, metalsmith, done) => {
      _.forEach(files, (file) => {
        // eslint-disable-next-line no-param-reassign
        file.link = file.link.replace('.hbs', '.html')
        // eslint-disable-next-line no-param-reassign
        file.link = file.link.replace('index.html', '')
      })
      return done()
    })
    .use(inplace({
      engine: 'handlebars',
      partials: 'docs/_partials',
      rename: true,
    }))
    // eslint-disable-next-line no-shadow
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata()
      metadata.snippets = {}
      // eslint-disable-next-line no-shadow
      _.forEach(files, (file) => {
        const name = file.link.substring(0, file.link.length - 5)
        metadata.snippets[name] = file.contents.toString()
      })
      return done()
    })
  )
metalsmith.use(log('Compiled all handlebars snippets'))

metalsmith.use(
  branch([
    '**/*.hbs',
    '!**/snippets/**/*.hbs',
  ])
    .use(filepath({}))
    // eslint-disable-next-line no-shadow
    .use((files, metalsmith, done) => {
      _.forEach(files, (file) => {
        // eslint-disable-next-line no-param-reassign
        file.link = file.link.replace('.hbs', '.html')
        // eslint-disable-next-line no-param-reassign
        file.link = file.link.replace('index.html', '')
      })
      return done()
    })
    .use(inplace({
      engine: 'handlebars',
      partials: 'docs/_partials',
      rename: true,
    })))
metalsmith.use(log('Compiled all handlebars pages'))

// Duplicate snippets to be used as demo pages (will be wrapped with templates below)
metalsmith.use(
  branch(['**/*.html'])
    .use(copy({
      pattern: '**/snippets/*.html',
      transform: file => file.replace(/snippets/i, 'demos'),
    }))
)
metalsmith.use(log('Duplicate snippets for demo pages'))

metalsmith.use(ignore(['**/includes/**', '**/_layouts/**', '**/jsdoc2md/**']))
metalsmith.use(log('Remove includes and layouts from metalsmith'))

// Add some pages to the search index
metalsmith.use(
  branch([
    '**/*.html',
    '!**/snippets/*.html',
    '!**/demos/*.html',
  ])
  .use(filepath({
    absolute: true,
  }))
  .use(lunr({
    fields: {
      title: 10,
      tags: 5,
      contents: 1,
    },
  }))
  .use(searchIndexData())
)
metalsmith.use(log('Added data to search index'))

metalsmith.use(
  branch([
    '**/*.html',
    '!**/snippets/*.html',
  ])
  .use(layouts({
    engine: 'handlebars',
    directory: path.join(cwd, './docs/_partials'),
  }))
)
metalsmith.use(log('Applied layouts to ALL THE PAGES!'))

metalsmith.use(copy({
  pattern: 'images2/**',
  move: true,
  transform: file => file.replace(`images2${path.sep}`, 'images/'),
}))
metalsmith.use(log('Copied images'))

metalsmith.use(log('Outputting now!'))
// Output
metalsmith.clean(false)
metalsmith.destination('./dist/docs/')

// Function to run the magic
metalsmith.build((err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error((new Date()).toLocaleTimeString(), 'Failed!', err)
  }

  // eslint-disable-next-line no-console
  console.info((new Date()).toLocaleTimeString(), 'Done!')
})
