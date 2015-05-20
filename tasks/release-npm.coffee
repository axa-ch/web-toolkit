gulp = require 'gulp'

del = require 'del'

module.exports = [
  [ 'release-npm-copy' ],
  ->
    del [ 'axa-web-style-guide-*.tgz' ]
]

# Copyright AXA Versicherungen AG 2015
