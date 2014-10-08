(($) ->

  # Public class definition
  class Site
    constructor: (element, options) ->
      DEFAULTS =
        mask: false

      @$element = $ element

      @$page = $(document).find(@$element.data('site-page'))
      @$menu = $(document).find(@$element.data('site-menu'))
      @options = $.extend {}, DEFAULTS, options

    toggleMenu: (show) ->

      if !show?
        show = !(@$page.hasClass 'is-pushed')

      if show
        @$page.addClass 'is-pushed'
        @$menu.addClass 'is-visible'
      else
        @$page.removeClass 'is-pushed'
        @$menu.removeClass 'is-visible'

    showMenu: () ->
      toggle true

    hideMenu: () ->
      toggle false

  # Plugin definition
  Plugin = (option) ->
    return this.each () ->
      $this = $ this
      data = $this.data 'axa.site'
      options = typeof option == 'object' && option

      if !data
        data = new Site this, options
        $this.data 'axa.site', data

      data[option]() ? typeof option == 'string'

  # Plugin registration
  $.fn.site = Plugin
  $.fn.site.Constructor = Site

  # data-* api
  ($ document).on('click.axa.site.data-api', '[data-toggle="site-menu"]', (e) ->
    e.preventDefault()
    Plugin.call($(this), 'toggleMenu');
  )

)(jQuery)
