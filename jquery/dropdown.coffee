(($) ->

  # Public class definition
  class Dropdown
    @DEFAULTS

    constructor: (element, options) ->
      @$element = $ element

      # TODO: Do not depend on css classes
      @$label = @$element.find '.dropdown__label'
      @$select = @$element.find '.dropdown__select'

      @options = $.extend {}, Dropdown.DEFAULTS, options

      @init()

    init: () ->
      @$select.attr 'tabindex', '-1'
      @$element.attr 'tabindex', '0'

      @$element.addClass 'dropdown--js'

      @setLabelText()

      @$select.on 'change', @setLabelText

      @$element.on 'keydown', @handleKeyDown

    # Handle spacebar to open the select box
    handleKeyDown: (e) =>
      if e.which == 32
        @$select.focus()

    setLabelText: () =>
      @$label.text @$select.find('option:selected').text()

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $ this
      options = $.extend({}, Dropdown.DEFAULTS, data, typeof option == 'object' && option)
      data = $this.data('axa.dropdown')

      if not data
        data = new Dropdown this, options
        $this.data 'axa.dropdown', data

  # Plugin registration
  $.fn.dropdown = Plugin
  $.fn.dropdown.Constructor = Dropdown

  # DATA-API
  $(window).on 'load', () ->
    $('[data-dropdown]').each () ->
      $dropdown = $(this)
      data = $dropdown.data()

      Plugin.call($dropdown, data)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
