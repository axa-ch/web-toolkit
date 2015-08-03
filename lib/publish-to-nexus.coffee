http = require 'http'
url = require 'url'
FormData = require 'form-data'

module.exports = (options, callback) ->
  form = new FormData

  form.append 'r', 'axa-releases'
  form.append 'hasPom', 'false'
  form.append 'e', 'jar'
  form.append 'g', options.groupId
  form.append 'a', options.artifactId
  form.append 'v', options.version
  form.append 'p', 'jar'
  form.append 'file', options.file

  endpoint = url.parse options.url

  form.submit {
    hostname: endpoint.hostname
    pathname: endpoint.pathname
    port: endpoint.port
    auth: [options.username, options.password].join(':')
    headers: do form.getHeaders
  }, (err, res) ->
    callback err, res

#! Copyright AXA Versicherungen AG 2015
