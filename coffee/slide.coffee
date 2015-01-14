(($) ->

  # Public class definition
  class Slide

    constructor: (element, options) ->
      @$element = $ element
      # @options = $.extend {}, options

      selector = @$element.data 'target'
      selector = options.target if not selector?

      @$target = $(selector)


      @$element.on 'click', @, (event) ->
        event.data.toggle(event)

    toggle: () ->
      @$target.slideToggle();

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      options = $.extend({}, data, typeof option == 'object' && option)
      action = option if typeof option == 'string'

      $this = $ this
      data = $this.data('axa.slide')

      if not data
        data = new Slide this, options
        $this.data 'axa.slide', data

  # Plugin registration
  $.fn.slide = Plugin
  $.fn.slide.Constructor = Slide

  # DATA-API
  $(window).on 'load', () ->
    $('[data-slide]').each () ->
      $slide = $(this)
      Plugin.call($slide)

)(jQuery)
