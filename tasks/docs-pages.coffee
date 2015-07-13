#
# The Metalsmith workflow that builds our docs.
#
path = require 'path'
marked = require 'marked'
colors = require 'colors'
gutil = require 'gulp-util'
moment = require 'moment'

readJSONFile = require '../lib/readJSONFile'
sampleJadeFilter = require '../lib/sampleJadeFilter'
markedRenderer = require '../lib/marked-renderer'
searchIndexData = require '../lib/search-index-data'
loadChangelog = require '../lib/load-changelog'

Metalsmith = require 'metalsmith'
collections = require 'metalsmith-collections'
templates = require 'metalsmith-templates'
jade = require 'metalsmith-jade'
markdown = require 'metalsmith-markdown'
branch = require 'metalsmith-branch'
define = require 'metalsmith-define'
drafts = require 'metalsmith-drafts'
filepath = require 'metalsmith-filepath'
relative = require 'metalsmith-relative'
lunr = require 'metalsmith-lunr'

module.exports = (cb) ->
  cwd = path.join __dirname, '../'
  config = readJSONFile path.join cwd, './docs/config.json'

  # GitHub integration
  if !process.env.GITHUB_INTEGRATION
    config.github = null

  # Jade filters
  jade.registerFilter 'sample', sampleJadeFilter

  # Configure marked
  marked.setOptions
    renderer: markedRenderer
    langPrefix: ''
    highlight: (code, lang) ->
      return require('highlight.js').highlight(lang, code).value;

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
    marked: marked
    moment: moment
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
      # TODO: Try to use our already-configured marked instance here
      .use markdown {
        renderer: markedRenderer
        langPrefix: ''
        highlight: (code, lang) ->
          return require('highlight.js').highlight(lang, code).value
        useMetadata: true
      }
  )

  # Do the jade pages
  metalsmith.use(
    branch [ '**/*.jade' ]
      .use filepath
        absolute: true
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
      .use lunr {
        includeAll: true
        fields: {
          title: 10
          tags: 5
          contents: 1
        }
      }
      .use searchIndexData()
      .use templates
        engine: 'jade'
        directory: path.join cwd, './docs/layouts'
  )

  # Output
  metalsmith.clean false
  metalsmith.destination './dist/docs/'

  # Function to run the magic
  build = ->
    metalsmith.build (err) ->
      if not err then cb() else cb(err)

  username = process.env.GITHUB_USERNAME
  password = process.env.GITHUB_PASSWORD

  if username and password
    gutil.log "Will load GitHub changelog with user " + username.cyan

    # Amazingly load our GitHub changelog to include it into our build!
    loadChangelog username, password, (err, changelog) ->
      if not err
        config.changelog = changelog
        gutil.log "Successfully loaded " + "#{changelog.length}".cyan + " changelog items!"
      else
        gutil.log "Failed loading changelog items!".red

      do build
  else
    # Just build it w/o changelog
    do build

# Copyright AXA Versicherungen AG 2015
