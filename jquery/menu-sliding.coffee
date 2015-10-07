(($) ->

  # Public class definition
  class SlidingMenu
    @DEFAULTS

    constructor: (element, options) ->
      @$element = $ element
      @options = $.extend {}, SlidingMenu.DEFAULTS, options

      @init()
      @level(@$element.children('[data-level]'))

      $(window).on('resize', @onWindowResize)

    init: () ->
      @$element.on 'click', '[data-back]', @, (event) ->
        link = $(event.target)
        currentLevel = link.closest('[data-level]')
        upperLevel = currentLevel.parent().closest('[data-level]')

        event.preventDefault()
        event.data.level(upperLevel)

      @$element.on 'click', '[data-link]', @, (event) ->
        link = $(event.target)
        subLevel = link.siblings('[data-level]')

        event.preventDefault()

        if subLevel.length > 0
          event.data.level(subLevel)

    onWindowResize: (e) =>
      @$element.css('height', @level().height())

    level: (toSet) ->
      if not toSet
        return @$element.find '.is-current'

      else
        @$element.find('.is-current').removeClass('is-current')
        @$element.find('.is-active').removeClass('is-active')
        @$element.find('[data-level]').css('left', '')

        level = @$element.find toSet

        if not level
          throw new Error 'Provided level not in menu!'

        @$element.css('height', level.height())

        parentLevels = level.parentsUntil @$element, '[data-level]'
        parentLinks = level.parentsUntil @$element, '[data-link]'

        @$element.children('[data-level]').css('left', (parentLevels.length * -100) + '%')

        level.addClass('is-current')
        level.siblings('[data-link]').addClass('is-active')
        parentLinks.addClass('is-active')

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $ this
      options = $.extend({}, SlidingMenu.DEFAULTS, data, typeof option == 'object' && option)
      action = option if typeof option == 'string'
      data = $this.data('axa.menu')

      if not data
        data = new SlidingMenu this, options
        $this.data 'axa.menu', data

      if action == 'level'
        data.level(params[1])

  # Plugin registration
  $.fn.slidingMenu = Plugin
  $.fn.slidingMenu.Constructor = SlidingMenu

  # DATA-API
  $(window).on 'load', () ->
    $('[data-menu="sliding"]').each () ->
      $menu = $(this)
      data = $menu.data()

      Plugin.call($menu, data)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
