class GitHubIntegrationViewModel
  constructor: (options) ->
    @options = options
    @storage = new Storage()
    @github = new GitHub options

    @github.readAccessToken = (->
      @storage.get 'access_token'
    ).bind @

    # The state values
    @isAuthenticating = ko.observable false
    @user = ko.observable null
    @membership = ko.observable null

    # The convenience values
    @isSignedIn = ko.computed (->
      @user() != null
    ).bind(@)

    @isNoMember = ko.computed (->
      m = @membership()
      m == null
    ).bind(@)

    @isActiveMember = ko.computed (->
      m = @membership()
      m != null && m.state == 'active'
    ).bind(@)

    @isPendingMember = ko.computed (->
      m = @membership()
      m != null && m.state == 'pending'
    ).bind(@)

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
      @github.teamMembership @options.team, user.login
    ).bind(@), ((err) ->
      # not signed in
      @isAuthenticating false
    ).bind(@)
    .then ((membership) ->
      @membership membership
    ).bind(@), ((err) ->
      # no access rights
      @isAuthenticating false
    ).bind(@)

  getAuthUrl: ->
    @github.getAuthUrl()

  askForAccess: (viewModel, e) ->
    e.preventDefault()

    body = @options.access.comment

    @isAskingForAccess true

    @github.commentGist(@options.access.gist, body)
    .then (->
      @isAskingForAccess false
      @hasAskedForAccess true
    ).bind(@), ((err) ->
      # commenting failed
      @isAskingForAccess false
      @hasAskedForAccess false
    ).bind(@)
    .then (->
      @storage.set 'has_asked_for_access', true
    ).bind(@), ((err) ->
      # setting the value failed
      @hasAskedForAccess true
    ).bind(@)

window.GitHubIntegrationViewModel = GitHubIntegrationViewModel

#! Copyright AXA Versicherungen AG 2015
