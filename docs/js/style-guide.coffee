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
    @isAuthenticating true
    authProvider = @pickTheRightAuthProvider()

    # authenticate
    authProvider()
    .then (->
      @isAuthenticating false
    ).bind(@)

    # has asked for access?
    @storage.get 'has_asked_for_access'
    .then ((hasAsked) ->
      @hasAskedForAccess hasAsked
    ).bind(@), ((err) ->
      # assume no access was requested yet
      @hasAskedForAccess false
    ).bind(@)

  pickTheRightAuthProvider: ->
    dataMap = URI(window.location).search(true)
    authProvider = null

    if dataMap.code
      authProvider = (-> @authWithCode dataMap.code).bind(@)
    else
      authProvider = (-> @authWithoutCode()).bind(@)

    authProvider

  authWithCode: (code) ->
    @github.accessToken code
    .then ((auth) ->
      @storage.set 'access_token', auth.token
    ).bind(@), ((err) ->
      # unsuccessful request
      @isAuthenticating false
    ).bind(@)
    .then ((token) ->
      @authWithoutCode()
    ).bind(@), ((err) ->
      # unsuccessful redirect
      @isAuthenticating false
    ).bind(@)

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

  askForAccess: (viewModel, e) ->
    e.preventDefault()

    body = 'asking for access'

    @isAskingForAccess true

    @github.commentGist('324dc1114e65df211cd5', body)
    .then (->
      @isAskingForAccess false
      @hasAskedForAccess true
    ).bind(@)
    .then (->
      @storage.set 'has_asked_for_access', true
    ).bind(@)

window.StyleGuideViewModel = StyleGuideViewModel
