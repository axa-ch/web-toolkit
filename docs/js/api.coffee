class GitHub
  constructor: () ->
    @urls =
      api: 'https://api.github.com'
      authorize: 'https://github.com/login/oauth/authorize'
      token: 'https://github.com/login/oauth/access_token'

    @oauth =
      id: '15c93ed0240a9d39c22d'
      secret: '1d4235c539aaaeb5e7f94454974dffc36d2f4abd'
      scopes: ['user', 'repo', 'gist']

  getAuthUrl: () ->
    URI(@urls.authorize)
    .addSearch 'client_id', @oauth.id
    .addSearch 'scope', @oauth.scopes.join(',')
    .addSearch 'state', 'state'

  accessToken: (code) ->
    $.ajax
      type: 'POST'
      url: @urls.token
      data:
        client_id: @oauth.id
        client_secret: @oauth.secret
        code: code
      crossDomain: true
      headers:
        'Accept': 'application/json'

  currentUser: () ->
    @readAccessToken()
    .then ((token) ->
      $.ajax
        type: 'GET'
        url: @urls.api + '/user'
        crossDomain: true
        headers:
          'Accept': 'application/vnd.github.v3+json'
          'Authorization': 'token ' + token
    ).bind @

  repo: (owner, name) ->
    @readAccessToken()
    .then ((token) ->
      $.ajax
        type: 'GET'
        url: @urls.api + '/repos/' + owner + '/' + name
        crossDomain: true
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
        url: @urls.api + '/gists/' + gistId + '/comments'
        data: JSON.stringify
          body: body
        crossDomain: true
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
