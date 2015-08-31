hljs = require('highlight.js')
fm = require('front-matter')
path = require('path')

# Simple 'fallback' for metalsmith-relative
relative = (to) ->
  to

# basedir for includes
basedir = path.join __dirname, '../docs/page'

module.exports = (jadeLang, jadeRuntime, jadeFilters) ->
  (text, options) ->
  	# Remove front matter
    file = fm(text)

    # Render
    html = jadeLang.render(file.body, pretty: true, relative: relative, basedir: basedir)

    return html

#! Copyright AXA Versicherungen AG 2015
