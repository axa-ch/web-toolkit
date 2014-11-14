class StyleGuideViewModel
  constructor: ->
    @storage = new Storage()

    @github = new GitHub()
    @github.readAccessToken = (->
      @storage.get 'access_token'
    ).bind @

    @isAuthenticating = ko.observable false
    @user = ko.observable null
    @repo = ko.observable null

    @isSignedInAndHasAccess = ko.computed (->
      (!@isAuthenticating() && @user() != null && @repo() != null)
    ).bind @

    @isSignedInAndHasNoAccess = ko.computed (->
      (!@isAuthenticating() && @user() != null && @repo() == null)
    ).bind @

    @isNotSignedIn = ko.computed (->
      (!@isAuthenticating() && @user() == null)
    ).bind @

    @isAskingForAccess = ko.observable false
    @hasAskedForAccess = ko.observable false

  init: ->
    dataMap = URI(window.location).search(true)
    authProvider = null

    if dataMap.code
      authProvider = (-> @authWithCode dataMap.code).bind @
    else
      authProvider = (-> @authWithoutCode()).bind @

    @isAuthenticating true

    authProvider()
    .then (->
      @isAuthenticating false
    ).bind @

  authWithCode: (code) ->
    @github.accessToken code
    .then ((auth) ->
      @storage.set 'access_token', auth.token
    ).bind @
    .then ((token) ->
      # remove code part
      window.location = URI(window.location).search {}
    ).bind @

  authWithoutCode: ->
    @github.currentUser()
    .then ((user) ->
      @user user
      @github.repo 'axa-ch', 'style-guide'
    ).bind(@), ((err) ->
      # not signed in
      @isAuthenticating false
    ).bind(@)
    .then ((repo) ->
      @repo repo
    ).bind(@), ((err) ->
      # no access rights
      @isAuthenticating false
    ).bind(@)

  getAuthUrl: ->
    @github.getAuthUrl()

  getGistUrl: ->
    'https://gist.github.com/' + 'davidknezic' + '/' + '324dc1114e65df211cd5'

  askForAccess: (viewModel, e) ->
    e.preventDefault()

    body = 'asking for access'

    @isAskingForAccess true

    @github.commentGist('324dc1114e65df211cd5', body)
    .then (->
      @isAskingForAccess false
      @hasAskedForAccess true
    ).bind @

window.StyleGuideViewModel = StyleGuideViewModel
