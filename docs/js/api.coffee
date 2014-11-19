class GitHub
  constructor: (options) ->
    @options = options

  getAuthUrl: () ->
    URI(@options.urls.authorize)
    .addSearch 'client_id', @options.oauth.id
    .addSearch 'scope', @options.oauth.scopes.join(',')
    .addSearch 'state', 'state'

  accessToken: (code) ->
    $.ajax
      type: 'GET'
      url: @options.urls.token + '/' + code

  currentUser: () ->
    @readAccessToken()
    .then ((token) ->
      $.ajax
        type: 'GET'
        url: @options.urls.api + '/user'
        headers:
          'Accept': 'application/vnd.github.v3+json'
          'Authorization': 'token ' + token
    ).bind @

  repo: (owner, name) ->
    @readAccessToken()
    .then ((token) ->
      $.ajax
        type: 'GET'
        url: @options.urls.api + '/repos/' + owner + '/' + name
        headers:
          'Accept': 'application/vnd.github.v3+json'
          'Authorization': 'token ' + token
    ).bind @

  commentGist: (gistId, body) ->
    @readAccessToken()
    .then ((token) ->
      $.ajax
        type: 'POST'
        contentType: 'json',
        url: @options.urls.api + '/gists/' + gistId + '/comments'
        data: JSON.stringify
          body: body
        headers:
          'Accept': 'application/vnd.github.v3.raw+json'
          'Authorization': 'token ' + token
    ).bind @

class Storage
  constructor: () ->

  get: (key) ->
    deferred = $.Deferred()

    localforage.getItem key, (err, value) ->
      deferred.resolve value if !err
      deferred.reject err if err

    deferred

  set: (key, value) ->
    deferred = $.Deferred()

    localforage.setItem key, value, (err, value) ->
      deferred.resolve value if !err
      deferred.reject err if err

    deferred

window.GitHub = GitHub
window.Storage = Storage
