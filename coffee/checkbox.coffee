(($) ->

  # Public class definition
  class Checkbox
    @DEFAULTS

    constructor: (element, options) ->
      @$element = $ element

      # TODO: Do not depend on css classes
      @$checkbox = @$element.find '.checkbox__checkbox'

      @options = $.extend {}, Checkbox.DEFAULTS, options

      @init()

    init: () ->
      @$element.addClass 'checkbox--js'

      @setCheckboxState()

      @$checkbox.on 'change', @setCheckboxState

    setCheckboxState: () =>
      if @$checkbox.is ':checked'
        @$element.addClass 'is-active'
      else
        @$element.removeClass 'is-active'

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $ this
      options = $.extend({}, Checkbox.DEFAULTS, data, typeof option == 'object' && option)
      data = $this.data('axa.checkbox')

      if not data
        data = new Checkbox this, options
        $this.data 'axa.checkbox', data

  # Plugin registration
  $.fn.checkbox = Plugin
  $.fn.checkbox.Constructor = Checkbox

  # DATA-API
  $(window).on 'load', () ->
    $('[data-checkbox]').each () ->
      $checkbox = $(this)
      data = $checkbox.data()

      Plugin.call($checkbox, data)

)(jQuery)
