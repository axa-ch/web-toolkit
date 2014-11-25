class MainViewModel
  constructor: (options) ->
    @options = options

    @isIE8Or9 = $('html').hasClass('ie8') || $('html').hasClass('ie9')

    # IE 8 & 9 won't have GitHub integration, since its XDomainRequest object -
    # which must be used for cross origin requests - doesn't support
    # https calls from a http site! One more IEWTF moment!
    @hasGitHubIntegration = !!options.github && !@isIE8Or9

    if @hasGitHubIntegration
      @github = new GitHubIntegrationViewModel(options.github)

  init: ->
    if @hasGitHubIntegration
      @github.init()

window.MainViewModel = MainViewModel
