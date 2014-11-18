class MainViewModel
  constructor: (options) ->
    @options = options

    @hasGitHubIntegration = !!options.github

    if @hasGitHubIntegration
      @github = new GitHubIntegrationViewModel(options.github)

  init: ->
    if @hasGitHubIntegration
      @github.init()

window.MainViewModel = MainViewModel
