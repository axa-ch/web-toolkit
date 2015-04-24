(($) ->

  # Public class definition
  class Info

    constructor: (element, options) ->
      @$element = $ element
      # @options = $.extend {}, options

      selector = @$element.data 'target'
      selector = options.target if not selector?

      @$target = $ selector

      @$element.on 'click', @, (event) ->
        event.data.toggle event

    toggle: () ->
      @$target.slideToggle()
      @$element.toggleClass 'is-active'

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      options = $.extend({}, data, typeof option == 'object' && option)
      action = option if typeof option == 'string'

      $this = $ this
      data = $this.data('axa.info')

      if not data
        data = new Info this, options
        $this.data 'axa.info', data

  # Plugin registration
  $.fn.info = Plugin
  $.fn.info.Constructor = Info

  # DATA-API
  $(window).on 'load', () ->
    $('[data-info]').each () ->
      $info = $(this)
      Plugin.call($info)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
