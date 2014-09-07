(($) ->

  # Public class definition
  class Site
    constructor: (element, options) ->
      DEFAULTS:
        mask: false

      @$element = $ element
      @options = $.extend {}, DEFAULTS, options

    toggle: (show) ->
      # TODO

    show: () ->
      toggle true

    hide: () ->
      toggle false

  # Plugin definition
  Plugin = (option) ->
    return this.each () ->
      $this = $ this
      data = $this.data 'bs.site'
      options = typeof option == 'object' && option

      if !data
        data = new Button this, options
        $this.data 'bs.site', data

      if option == 'toggle'
        # Do what we want to do
        data.toggle
      else if option
        # Execute default action
        data.setState option

  # Plugin registration
  $.fn.button = Plugin
  $.fn.button.Constructor = Button

)(jQuery)
