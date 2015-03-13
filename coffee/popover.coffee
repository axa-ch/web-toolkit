(($) ->

  # Public class definition
  class Popover
    constructor: (element, options) ->
      @element = element
      @$element = $ element
      @options = $.extend {}, options

      @$target = $ @$element.data('popover')

      console.log @$element
      console.log @$target

      @$target.css 'visibility', 'hidden'

      @$element.on 'click', @, (event) ->
        event.data.$target.css 'visibility',
          if event.data.$target.css('visibility') == 'visible' then 'hidden' else 'visible'

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      options = $.extend({}, data, typeof option == 'object' && option)
      $this = $ this
      data = $this.data('axa.popover')

      if not data
        data = new Popover this, options
        $this.data 'axa.popover', data

  # Plugin registration
  $.fn.popover = Plugin
  $.fn.popover.Constructor = Popover

  # DATA-API
  $(window).on 'load', () ->
    $('[data-popover]').each () ->
      $popover = $(this)

      Plugin.call($popover)

)(jQuery)
