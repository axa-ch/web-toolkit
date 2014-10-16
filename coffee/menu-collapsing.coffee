(($) ->

  # Public class definition
  class CollapsingMenu
    @DEFAULTS

    constructor: (element, options) ->
      @$element = $ element
      @options = $.extend {}, CollapsingMenu.DEFAULTS, options

      @init()

    init: () ->
      @$element.on 'click', '.menu__link', @, (event) ->
        link = $(event.target)
        subLevel = link.siblings('.menu__level')

        if subLevel.length > 0
          event.data.toggle(subLevel)

    toggle: (toSet) ->
      level = @$element.find toSet

      throw new Error 'Provided level not in menu!' if not level

      shouldOpen = not level.hasClass('is-open')

      level.toggleClass('is-open', shouldOpen)
      level.siblings('.menu__link').toggleClass('is-active', shouldOpen)

      level.parentsUntil(@$element, '.menu__link').toggle('is-active')

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
