import path from 'path'
import marked from 'marked'
import colors from 'colors'
import gutil from 'gulp-util'
import moment from 'moment'
import _ from 'lodash'
import fs from 'fs'

import highlight from 'highlight.js'
import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import templates from 'metalsmith-templates'
import jade from 'metalsmith-jade'
import markdown from 'metalsmith-markdown'
import branch from 'metalsmith-branch'
import define from 'metalsmith-define'
import drafts from 'metalsmith-drafts'
import filepath from 'metalsmith-filepath'
import relative from 'metalsmith-relative'
import lunr from 'metalsmith-lunr'
import copy from 'metalsmith-copy'
import ignore from 'metalsmith-ignore'

import readJSONFile from '../lib/readJSONFile'
import sampleJadeFilter from '../lib/jade-filter-sample'
import highlightCodeJadeFilter from '../lib/jade-filter-highlightcode'
import ignoreFmJadeFilter from '../lib/jade-filter-ignorefrontmatter'
import markedRenderer from '../lib/marked-renderer'
import markedChangelogRenderer from '../lib/marked-renderer-changelog'
import searchIndexData from '../lib/search-index-data'
import loadChangelog from '../lib/load-changelog'
import navigation from '../lib/metalsmith-navigation'
import relate from '../lib/metalsmith-relate'

export default function (cb) {
  const cwd = path.join(__dirname, '../')
  const config = readJSONFile(path.join(cwd, './docs/config.json'))
  const metalsmithSource = './docs/page'

  // basedir for include paths
  const jadeBaseDir = path.join(cwd, metalsmithSource)

  // Jade filters
  jade.registerFilter('sample', sampleJadeFilter)
  jade.registerFilter('highlightcode', highlightCodeJadeFilter)
  jade.registerFilter('ignorefrontmatter', ignoreFmJadeFilter)

  // Configure marked
  marked.setOptions({
    renderer: markedRenderer,
    langPrefix: '',
    highlight(code, lang) {
      return highlight.highlight(lang, code).value
    },
  })

  // initialize Metalsmith
  const metalsmith = new Metalsmith(cwd)
  metalsmith.source(metalsmithSource)

  // filter all pages with draft set to true in front-matter
  metalsmith.use(drafts())

  // add metadata
  metalsmith.use(define({
    icons: fs.readdirSync(path.join(cwd, 'icons')).map(file => ({
      name: file.replace(/\.svg$/, ''),
    })),
    colors: readJSONFile(path.join(cwd, 'less/colors.json')),
    version: readJSONFile(path.join(cwd, 'tmp/version.json')),
    package: readJSONFile(path.join(cwd, 'package.json')),
    config,
    moment,
    marked,
    changelogRenderer: markedChangelogRenderer,
    // basedir for layout files
    basedir: jadeBaseDir,
  }))

  // Do the markdown pages
  metalsmith.use(
    branch(['**/*.md', '!_*/**/*.md'])
      .use(relative())
      .use(markdown({
        useMetadata: true,
        marked,
      }))
  )

  // Do the jade pages
  metalsmith.use(
    branch(['**/*.jade'])
      .use(filepath({
        absolute: true,
      }))
      .use((files, metalsmith, done) => {
        _.forEach(files, file => {
          file.link = `${file.link.slice(0, -5)}.html`
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
      .use(jade({
        useMetadata: true,
        locals: metalsmith.metadata(),
        pretty: true,
        basedir: jadeBaseDir,
      }))
  )

  // Duplicate snippets to be used as demo pages (will be wrapped with templates below)
  metalsmith.use(
    branch(['**/*.html'])
      .use(copy({
        pattern: '**/snippets/*.html',
        transform: file => file.replace(/snippets/i, 'demos'),
      }))
  )

  metalsmith.use(ignore('**/includes/**'))

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

  // Wrap the pages with their template
  metalsmith.use(
    branch([
      '**/*.html',
      '!**/snippets/*.html',
    ])
    .use(templates({
      engine: 'jade',
      directory: path.join(cwd, './docs/layouts'),
    }))
  )

  // Output
  metalsmith.clean(false)
  metalsmith.destination('./dist/docs/')

  // Function to run the magic
  const build = () =>
    metalsmith.build((err) => {
      if (err) { return cb(err) }
      return cb()
    })

  const username = process.env.GITHUB_USERNAME
  const password = process.env.GITHUB_PASSWORD

  if (username && password) {
    gutil.log(`Will load GitHub changelog with user ${username.cyan}`)

    // Amazingly load our GitHub changelog to include it into our build!
    return loadChangelog(username, password, (err, changelog) => {
      if (err) {
        gutil.log('Failed loading changelog items!'.red)
      } else {
        config.changelog = changelog
        gutil.log(`Successfully loaded ${`${changelog.length}`.cyan} changelog items!`)
      }

      return build()
    })
  } else {
    // Just build it w/o changelog
    return build()
  }
}

//! Copyright AXA Versicherungen AG 2015
