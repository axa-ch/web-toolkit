colors = require 'colors'
fs = require 'fs'
gulp = require 'gulp'
gutil = require 'gulp-util'
prompt = require 'prompt'
publish = require '../lib/publish-to-nexus'
readJSONFile = require '../lib/readJSONFile'

module.exports = [['maven-package']
  (cb) ->
    packageJson = readJSONFile './package.json'
    version = packageJson.version

    nexus =
      username: process.env.NEXUS_USERNAME
      password: process.env.NEXUS_PASSWORD
      url: process.env.NEXUS_URL
      proxy: process.env.HTTP_PROXY

    settings = []
    settings.push { name: 'username' } if not nexus.username
    settings.push { name: 'password', hidden: true } if not nexus.password
    settings.push { name: 'url' } if not nexus.url
    settings.push { name: 'proxy' } if not nexus.proxy

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
      nexus.proxy = result.proxy if result.proxy

      gutil.log "Uploading version #{version.cyan} to #{nexus.url.cyan}"
      gutil.log "Using user #{nexus.username.cyan}"

      publish {
        groupId: 'com.axa.ch'
        artifactId: 'web-style-guide'
        version: version
        file: fs.createReadStream './tmp/axa-web-style-guide.jar'
        username: nexus.username
        password: nexus.password
        url: nexus.url
        proxy: nexus.proxy
      }, (err, res) ->
        return cb err if err
        switch res.statusCode
          when 201
            gutil.log 'Upload successful! Congrats!'.green
          when 400
            gutil.log "#{'Upload failed!'.red} Status code #{'400'.cyan}"
            gutil.log "Are you trying to replace an existing artifact?"
          else
            gutil.log "Upload failed with status #{res.statusCode.toString().red}"
        do cb
]
#! Copyright AXA Versicherungen AG 2015
