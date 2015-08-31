path = require 'path'
marked = require 'marked'
colors = require 'colors'
gutil = require 'gulp-util'
moment = require 'moment'
_ = require 'lodash'

readJSONFile = require '../lib/readJSONFile'
sampleJadeFilter = require '../lib/jade-filter-sample'
highlightCodeJadeFilter = require '../lib/jade-filter-highlightcode'
ignoreFmJadeFilter = require '../lib/jade-filter-ignorefrontmatter'
markedRenderer = require '../lib/marked-renderer'
markedChangelogRenderer = require '../lib/marked-renderer-changelog'
searchIndexData = require '../lib/search-index-data'
loadChangelog = require '../lib/load-changelog'
navigation = require '../lib/metalsmith-navigation'
relate = require '../lib/metalsmith-relate'

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
copy = require 'metalsmith-copy'
ignore = require 'metalsmith-ignore'

module.exports = (cb) ->
  cwd = path.join __dirname, '../'
  config = readJSONFile path.join cwd, './docs/config.json'
  metalsmithSource = './docs/page'

  # basedir for include paths
  jadeBaseDir = path.join cwd, metalsmithSource

  # Jade filters
  jade.registerFilter 'sample', sampleJadeFilter
  jade.registerFilter 'highlightcode', highlightCodeJadeFilter
  jade.registerFilter 'ignorefrontmatter', ignoreFmJadeFilter

  # Configure marked
  marked.setOptions
    renderer: markedRenderer
    langPrefix: ''
    highlight: (code, lang) ->
      return require('highlight.js').highlight(lang, code).value

  # initialize Metalsmith
  metalsmith = new Metalsmith cwd
  metalsmith.source metalsmithSource

  # filter all pages with draft set to true in front-matter
  metalsmith.use drafts()

  # add metadata
  metalsmith.use define
    icons: readJSONFile path.join cwd, 'tmp/icons.json'
    colors: readJSONFile path.join cwd, 'less/colors.json'
    version: readJSONFile path.join cwd, 'tmp/version.json'
    package: readJSONFile path.join cwd, 'package.json'
    config: config
    moment: moment
    marked: marked
    changelogRenderer: markedChangelogRenderer
    # basedir for layout files
    basedir: jadeBaseDir

  # Do the markdown pages
  metalsmith.use(
    branch ['**/*.md', '!_*/**/*.md']
      .use relative()
      .use markdown
        useMetadata: true
        marked: marked
  )

  # Do the jade pages
  metalsmith.use(
    branch ['**/*.jade']
      .use filepath
        absolute: true
      .use (files, metalsmith, done) ->
        _.forEach files, (file) =>
          file.link = "#{file.link.slice(0, -5)}.html"
        do done
      .use relative()
      .use collections
        navigation:
          sortBy: 'order'
          refer: false
      .use jade
        useMetadata: true
        locals: metalsmith.metadata()
        pretty: true
        basedir: jadeBaseDir
  )

  # Duplicate snippets to be used as demo pages (will be wrapped with templates below)
  metalsmith.use(
    branch ['**/*.html']
      .use copy
        pattern: '**/snippets/*.html'
        transform: (file) => file.replace /snippets/i, 'demos'
  )

  metalsmith.use ignore '**/includes/**'

  # Add some pages to the search index
  metalsmith.use(
    branch [
        '**/*.html'
        '!**/snippets/*.html'
        '!**/demos/*.html'
      ]
      .use filepath
        absolute: true
      .use relate()
      .use navigation()
      .use lunr
        includeAll: true
        fields:
          title: 10
          tags: 5
          contents: 1
      .use searchIndexData()
  )

  # Wrap the pages with their template
  metalsmith.use(
    branch [
        '**/*.html'
        '!**/snippets/*.html'
      ]
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

#! Copyright AXA Versicherungen AG 2015
