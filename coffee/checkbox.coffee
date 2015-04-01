(($) ->

  # Public class definition
  class Checkbox
    @DEFAULTS

    constructor: (element, options) ->
      @$element = $ element

      # TODO: Do not depend on css classes
      @$checkbox = @$element.find '.checkbox__checkbox'
      @$label = @$element.find '.checkbox__label'

      @options = $.extend {}, Checkbox.DEFAULTS, options

      @init()

    init: () ->
      @$checkbox.attr 'tabindex', '-1'
      @$label.attr 'tabindex', '0'

      @$element.addClass 'checkbox--js'

      @setCheckboxState()

      @$checkbox.on 'change', @setCheckboxState

      @$label.on 'keyup', @handleKeyUp

    # Handle spacebar to toggle the checkbox
    handleKeyUp: (e) =>
      if e.which == 32
        # prevent scrolling
        e.preventDefault()

        @$checkbox.prop 'checked', !(@$checkbox.is ':checked')

        # Emit a change event manually
        @$checkbox.change()

    # Updates the UI according to the checkbox state
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
# Copyright AXA Versicherungen AG 2015
