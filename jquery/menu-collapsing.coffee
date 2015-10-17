(($) ->

  # Public class definition
  class CollapsingMenu
    @DEFAULTS:
      exclusive: false

    constructor: (element, options) ->
      @$element = $ element
      @options = $.extend {}, CollapsingMenu.DEFAULTS, options

      @init()

    init: () ->
      @$element.on 'click', '[data-link]', @, (event) ->
        link = $(event.target)
        subLevel = link.siblings('[data-level]')

        if subLevel.length > 0
          event.preventDefault()
          event.data.toggle(subLevel)

    toggle: (toSet) ->
      level = @$element.find toSet

      throw new Error 'Provided level not in menu!' if not level

      parentLinks = level.parentsUntil(@$element, '[data-link]')
      parentLevels = level.parentsUntil(@$element, '[data-level]')

      shouldOpen = not level.hasClass('is-open')

      if shouldOpen and @options.exclusive
        @$element.find('[data-level]').not(parentLevels)
          .removeClass('is-open')
          .siblings('[data-link]').removeClass('is-active')

      level.toggleClass('is-open', shouldOpen)
        .siblings('[data-link]').toggleClass('is-active', shouldOpen)

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $ this
      options = $.extend({}, CollapsingMenu.DEFAULTS, data, typeof option == 'object' && option)
      action = option if typeof option == 'string'
      data = $this.data('axa.menu')

      if not data
        data = new CollapsingMenu this, options
        $this.data 'axa.menu', data

      if action == 'toggle'
        data.toggle(params[1])

  # Plugin registration
  $.fn.collapsingMenu = Plugin
  $.fn.collapsingMenu.Constructor = CollapsingMenu

  # DATA-API
  $(window).on 'load', () ->
    $('[data-menu="collapsing"]').each () ->
      $menu = $(this)
      data = $menu.data()

      Plugin.call($menu, data)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
