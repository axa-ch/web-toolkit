(($) ->

  # Public class definition
  class Spinner
    constructor: (element) ->
      @$element = $ element
      @$defaults = $ '[data-default]'
      @$fallbacks = $ '[data-fallback]'

      @fallback true

    fallback: (toggle) ->
      @$defaults.toggleClass 'is-disabled', toggle
      @$fallbacks.toggleClass 'is-enabled', toggle

  # Plugin definition
  Plugin = (option) ->
    return this.each () ->
      action = option if typeof option == 'string'

      $this = $ this
      data = $this.data 'axa.spinner'

      if not data
        data = new Spinner this
        $this.data 'axa.spinner', data

      if action == 'fallback'
        data.fallback(arguments[1])

  # Plugin registration
  $.fn.spinner = Plugin
  $.fn.spinner.Constructor = Spinner

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
    $('[data-spinner="bouncy"]').each () ->
      $spinner = $(this)
      Plugin.call($spinner)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
