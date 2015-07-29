http = require 'http'
FormData = require 'form-data'

module.exports = (options, callback) ->
  form = new FormData

  form.append 'r', 'axa-releases'
  form.append 'hasPom', false
  form.append 'e', 'jar'
  form.append 'g', options.groupId
  form.append 'a', options.artifactId
  form.append 'v', options.version
  form.append 'p', 'jar'
  form.append 'file', options.file

  request = http.request
    hostname: ''
    port: 80
    path: ''
    method: 'POST'
    auth: "#{options.username}:#{options.password}"
    headers: do form.getHeaders

  form.pipe request

  request.on 'response', (res) ->
    callback res

#! Copyright AXA Versicherungen AG 2015
