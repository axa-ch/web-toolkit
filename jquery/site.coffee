(($) ->

  # Public class definition
  class Site
    @DEFAULTS:
      mask: false

    constructor: (element, options) ->
      @$element = $ element

      @$page = @$element.find('.site__page')
      @$menu = @$element.find('.site__mobile-menu')

      @options = $.extend {}, Site.DEFAULTS, options

      @$element.on 'click', '.site__page.is-masked', @, (event) ->
        event.data.hideMenu()

    toggleMenu: (show) ->
      show = not @$page.hasClass('is-pushed') if not show?

      @$element.toggleClass('is-mobile-nav-open', show)
      @$page.toggleClass('is-pushed', show)
      @$page.toggleClass('is-masked', show) if @options.mask
      @$menu.toggleClass('is-visible', show)

    showMenu: () ->
      @toggleMenu(true)

    hideMenu: () ->
      @toggleMenu(false)

  # Plugin definition
  Plugin = (option) ->
    return this.each () ->
      $this = $ this
      data = $this.data('axa.site')

      if not data
        options = (typeof option == 'object' and option)
        options = options or {}

        $.extend options, $this.data()

        data = new Site this, options
        $this.data 'axa.site', data

      data[option]() if typeof option == 'string'

  # Plugin registration
  $.fn.site = Plugin
  $.fn.site.Constructor = Site

  # DATA-API
  ($ document).on 'click.axa.site.data-api', '[data-toggle="site-menu"]', (e) ->
    $this = $(this)
    href = $this.attr('href')
    $target = $($this.attr('data-target') or (href && href.replace(/.*(?=#[^\s]+$)/, '')))

    e.preventDefault if $this.is 'a'

    Plugin.call($target, 'toggleMenu')

)(jQuery)
# Copyright AXA Versicherungen AG 2015
