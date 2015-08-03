colors = require 'colors'
fs = require 'fs'
gulp = require 'gulp'
gutil = require 'gulp-util'
prompt = require 'prompt'
publish = require '../lib/publish-to-nexus'

module.exports = (cb) ->
  nexus =
    username: process.env.NEXUS_USERNAME
    password: process.env.NEXUS_PASSWORD
    url: process.env.NEXUS_URL

  settings = []
  settings.push { name: 'username' } if not nexus.username
  settings.push { name: 'password', hidden: true } if not nexus.password
  settings.push { name: 'url' } if not nexus.url

  prompt.message = '>'.green
  prompt.delimiter = ' '
  prompt.start()
  prompt.get settings, (err, result) ->
    if err
      gutil.log 'Unable to get input information!'.red
      return do cb

    nexus.username = result.username if result.username
    nexus.password = result.password if result.password
    nexus.url = result.url if result.url

    gutil.log "Uploading version #{'0.6.0'.cyan} to #{nexus.url.cyan}"
    gutil.log "Using user #{nexus.username.cyan}"

    publish {
      groupId: 'com.axa.ch'
      artifactId: 'web-style-guide'
      version: '0.6.0'
      file: fs.createReadStream './tmp/axa-web-style-guide.jar'
      username: nexus.username
      password: nexus.password
      url: nexus.url
    }, (err, res) ->
      return cb err if err
      gutil.log "Upload finished with status code #{res.statusCode.toString().cyan}"
      do cb

#! Copyright AXA Versicherungen AG 2015
