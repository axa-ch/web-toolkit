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

  proxy = if options.proxy then url.parse options.proxy else null
  endpoint = url.parse options.url
  headers = do form.getHeaders
  headers.Host = endpoint.hostname if proxy

  request = http.request {
    method: 'post'
    host: endpoint.hostname if not proxy
    host: proxy.hostname if proxy
    path: endpoint.pathname if not proxy
    path: options.url if proxy
    port: endpoint.port if not proxy
    port: proxy.port if proxy
    auth: [options.username, options.password].join(':')
    headers: headers
  }

  form.pipe request

  request.on 'response', (res) ->
    callback null, res

#! Copyright AXA Versicherungen AG 2015
