fs = require 'fs'
gulp = require 'gulp'
publish = require '../lib/publish-to-nexus'
readJSONFile = require '../lib/readJSONFile'

module.exports = ->
  packageJson = readJSONFile './package.json'

  filename = "./tmp/axa-web-style-guide-#{packageJson.version}.jar"

  options =
    groupId: 'com.axa.ch'
    artifactId: 'web-style-guide'
    version: '0.6.0'
    file: fs.createReadStream(filename)
    username: ''
    password: ''

  publish options, (res) ->
    console.log res

#! Copyright AXA Versicherungen AG 2015
