#
# The Metalsmith workflow that builds our docs.
#
path = require 'path'

readJSONFile = require '../lib/readJSONFile'
sampleJadeFilter = require '../lib/sampleJadeFilter'
markedRenderer = require '../lib/markedRenderer'

Metalsmith = require 'metalsmith'
collections = require 'metalsmith-collections'
templates = require 'metalsmith-templates'
jade = require 'metalsmith-jade'
markdown = require 'metalsmith-markdown'
ignore = require 'metalsmith-ignore'
branch = require 'metalsmith-branch'
less = require 'metalsmith-less'
define = require 'metalsmith-define'
drafts = require 'metalsmith-drafts'
assets = require 'metalsmith-assets'
autoprefixer = require 'metalsmith-autoprefixer'
coffee = require 'metalsmith-coffee'
filepath = require 'metalsmith-filepath'
relative = require 'metalsmith-relative'
postcss = require 'metalsmith-postcss'
pseudoelements = require 'postcss-pseudoelements'

module.exports = (cb) ->

  cwd = path.join __dirname, '../'
  config = readJSONFile path.join cwd, './docs/config.json'

  # GitHub integration
  if !process.env.GITHUB_INTEGRATION
    config.github = null

  # Jade filters
  jade.registerFilter 'sample', sampleJadeFilter

  # initialize Metalsmith
  metalsmith = new Metalsmith cwd
  metalsmith.source './docs/page'

  # filter all pages with draft set to true in front-matter
  metalsmith.use drafts()

  # add metadata
  metalsmith.use define {
    icons: readJSONFile path.join cwd, 'tmp/icons.json'
    colors: readJSONFile path.join cwd, 'less/colors.json'
    version: readJSONFile path.join cwd, 'tmp/version.json'
    package: readJSONFile path.join cwd, 'package.json'
    config: config
  }

  # do the static pages
  # TODO: Remove when collection plugin supports undeclared collections
  collections_options = {}

  [
    'nav',
    'nav__fundamentals',
    'nav__fundamentals__layout',
    'nav__fundamentals__design',
    'nav__fundamentals__code',
    'nav__components',
    'nav__components__form',
    'nav__patterns',
    'nav__inspiration'
  ].forEach (name) ->
    collections_options[name] =
      sortBy: 'order'
      reverse: false

  # Do the markdown pages
  metalsmith.use(
    branch('**/*.md', '!_*/**/*.md')
      .use relative()
      .use collections collections_options
      .use markdown {
        renderer: markedRenderer
        langPrefix: ''
        highlight: (code, lang) ->
          return require('highlight.js').highlight(lang, code).value
        useMetadata: true
      }
  )

  # Configure marked to use custom highlight
  require('marked').setOptions
    renderer: markedRenderer
    langPrefix: ''
    highlight: (code, lang) ->
      return require('highlight.js').highlight(lang, code).value;

  # Do the jade pages
  metalsmith.use(
    branch [ '**/*.jade' ]
      .use relative()
      .use collections collections_options
      .use jade
        useMetadata: true
        locals: metalsmith.metadata()
  )

  # Wrap the pages with their template
  metalsmith.use(
    branch ['**/*.html' ]
      .use filepath
        absolute: true
      .use templates
        engine: 'jade'
        directory: path.join cwd, './docs/layouts'
  )

  # Output
  metalsmith.destination './dist/docs'

  return metalsmith.build (err) ->
    if err then cb(err) else cb()

# Copyright AXA Versicherungen AG 2015
