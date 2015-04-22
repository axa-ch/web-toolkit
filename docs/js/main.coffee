class MainViewModel
  constructor: (options) ->
    @options = options

    @hasGitHubIntegration = !!options.github

    if @hasGitHubIntegration
      @github = new GitHubIntegrationViewModel(options.github)

  init: ->
    if window.location.host == 'axa-ch.github.io'
      if window.location.protocol != 'https:'
        window.location.protocol = 'https'

    if @hasGitHubIntegration
      @github.init()

window.MainViewModel = MainViewModel

#! Copyright AXA Versicherungen AG 2015
