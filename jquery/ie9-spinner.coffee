(($) ->

  # Public class definition
  class IE9Spinner

    constructor: (element, options) ->
      @$element = $ element

      @$element.addClass 'is-fallback-active'

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      options = $.extend({}, data, typeof option == 'object' && option)
      action = option if typeof option == 'string'

      $this = $ this
      data = $this.data('axa.ie9Spinner')

      if not data
        data = new IE9Spinner this, options
        $this.data 'axa.ie9Spinner', data

  # Plugin registration
  $.fn.ie9Spinner = Plugin
  $.fn.ie9Spinner.Constructor = IE9Spinner

  # DATA-API
  $(window).on 'load', () ->
    #check for support of the animation property
    elm = document.createElement 'div'
    properties = [
      'animation'
      'WebkitAnimation'
      'MozAnimation'
      'msAnimation'
      'OAnimation'
    ]
    for property in properties
      if elm.style[property]?
        #if the animation property is supported, exit
        return

    #animation property not supported, activate fallback on all spinners
    $('[data-spinner]').each () ->
      $spinner = $(this)
      Plugin.call($spinner)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
