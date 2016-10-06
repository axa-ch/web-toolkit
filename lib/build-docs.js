import path from 'path'
import marked from 'marked'
import moment from 'moment'
import _ from 'lodash'
import fs from 'fs'
import handlebars from 'handlebars'

import highlight from 'highlight.js'
import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import layouts from 'metalsmith-layouts'
import pug from 'metalsmith-pug'
import markdown from 'metalsmith-markdown'
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

import readJSONFile from '../lib/readJSONFile'
import sampleJadeFilter from '../lib/jade-filter-sample'
import highlightCodeJadeFilter from '../lib/jade-filter-highlightcode'
import markedRenderer from '../lib/marked-renderer'
import searchIndexData from '../lib/search-index-data'
import navigation from '../lib/metalsmith-navigation'
import relate from '../lib/metalsmith-relate'
import log from '../lib/metalsmith-log'
import sitemap from '../lib/metalsmith-sitemap'

import hbsRelative from '../lib/handlebars-relative'
import hbsEquals from '../lib/handlebars-eq'

const cwd = path.join(__dirname, '../')
const config = readJSONFile(path.join(cwd, './docs/config.json'))
const metalsmithSource = './docs'

// basedir for include paths
const pugBaseDir = path.join(cwd, metalsmithSource)

// Pug filters
const pugFilters = {
  sample: sampleJadeFilter,
  highlight: highlightCodeJadeFilter,
}

// Configure marked
marked.setOptions({
  renderer: markedRenderer,
  langPrefix: '',
  highlight(code, lang) {
    return highlight.getLanguage(lang) ? highlight.highlight(lang, code).value : undefined
  },
})

handlebars.registerHelper('relative', hbsRelative)
handlebars.registerHelper('eq', hbsEquals)

// initialize Metalsmith
const metalsmith = new Metalsmith(cwd)
metalsmith.source(metalsmithSource)
metalsmith.use(log('Start metalsmith build!'))

if (process.env.NODE_ENV !== 'production') {
  metalsmith.use(watch({
    paths: {
      "${source}/**/*": "**/*",
    },
    livereload: false,
  }))
  metalsmith.use(log('Started watch'))
}

// filter all pages with draft set to true in front-matter
metalsmith.use(drafts())
metalsmith.use(log('Excluded draft pages'))

metalsmith.use(
  branch(['**/*.hbs', '**/*.pug', '!layouts/**', '**/*.md', '!_*/**/*.md', '!**/snippets/**'])
    .use(drafts())
    .use(sitemap())
  )
metalsmith.use(log('Added sitemap'))

// add metadata
metalsmith.use(define({
  icons: fs.readdirSync(path.join(cwd, 'icons')).map(file => ({
    name: file.replace(/\.svg$/, ''),
  })),
  readme: fs.readFileSync(path.join(cwd, 'README.md'), 'utf8'),
  colors: readJSONFile(path.join(cwd, 'scss/colors.json')),
  package: readJSONFile(path.join(cwd, 'package.json')),
  config,
  moment,
  marked,
  // basedir for layout files
  basedir: pugBaseDir,
}))
metalsmith.use(log('Added metadata to metalsmith build'))

// Do the markdown pages
metalsmith.use(
  branch(['**/*.md', '!_*/**/*.md'])
    .use(relative())
    .use(markdown({
      useMetadata: true,
      marked,
    }))
)
metalsmith.use(log('Compiled the markdown pages'))

metalsmith.use(
  branch(['**/*.hbs'])
    .use(filepath({}))
    .use((files, metalsmith, done) => {
      _.forEach(files, file => {
        file.link = file.link.replace('.hbs', '.html')
      })
      return done()
    })
    .use(inplace({
    engine: 'handlebars',
    partials: 'hbs-partials',
    rename: true,
})))
metalsmith.use(log('Compiled all handlebars pages'))

metalsmith.use(log('Baking a cake...'))
// Do the Pug pages
metalsmith.use(
  branch(['**/*.pug', '!layouts/**'])
    .use(filepath({
      absolute: true,
    }))
    .use((files, metalsmith, done) => {
      _.forEach(files, file => {
        file.link = file.link.replace('.pug', '.html')
      })
      return done()
    })
    .use(relative())
    .use(collections({
      navigation: {
        sortBy: 'order',
        refer: false,
      },
    }))
    .use(pug({
      useMetadata: true,
      locals: metalsmith.metadata(),
      pretty: true,
      basedir: pugBaseDir,
      filters: pugFilters,
    }))
)
metalsmith.use(log('Compiled all pug pages'))

// Duplicate snippets to be used as demo pages (will be wrapped with templates below)
metalsmith.use(
  branch(['**/*.html'])
    .use(copy({
      pattern: '**/snippets/*.html',
      transform: file => file.replace(/snippets/i, 'demos'),
    }))
)
metalsmith.use(log('Duplicate snippets for demo pages'))

metalsmith.use(ignore(['**/includes/**', '**/layouts/**']))
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
  .use(relate())
  .use(navigation())
  .use(lunr({
    includeAll: true,
    fields: {
      title: 10,
      tags: 5,
      contents: 1,
    },
  }))
  .use(searchIndexData())
)
metalsmith.use(log('Added data to search index'))


metalsmith.use(log('Eating cake now... Mhmm...'))
// Wrap the pages with their template
metalsmith.use(
  branch([
    '**/*.html',
    '!**/snippets/*.html',
  ])
  .use(layouts({
    engine: 'pug',
    directory: path.join(cwd, './docs/layouts'),
  }))
)
metalsmith.use(log('Wrapped markdown generated pages with their layouts.'))

metalsmith.use(copy({
  pattern: 'images2/**',
  move: true,
  transform: (file) => file.replace('images2' + path.sep, 'images/')
}))
metalsmith.use(log('Copied images'))

metalsmith.use(log('Outputting now!'))
// Output
metalsmith.clean(false)
metalsmith.destination('./dist/docs/')

// Function to run the magic
metalsmith.build((err) => {
  if (err) {
    console.log('Failed!', err)
  }
  console.log('Done!')
})

//! Copyright AXA Versicherungen AG 2015
