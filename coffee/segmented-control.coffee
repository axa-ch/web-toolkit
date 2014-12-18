(($) ->

  # Public class definition
  class SegmentedControl
    @DEFAULTS

    constructor: (element, options) ->
      @$element = $ element

      # TODO: Do not depend on css classes
      @$radios = @$element.find '.segmented-control__radio'

      @$radios.each (index, element) ->
        $radio = $ element

        $radio.data 'item.element', $radio.closest '.segmented-control__item'

      @options = $.extend {}, SegmentedControl.DEFAULTS, options

      @init()

    init: () ->
      @$element.addClass 'segmented-control--js'

      @setRadioState()

      @$radios.on 'change', @setRadioState

    setRadioState: () =>

      @$radios.each (index, element) ->

        $radio = $ element
        $item = $radio.data 'item.element'

        if $radio.is ':checked'
          $item.addClass 'is-active'
        else
          $item.removeClass 'is-active'

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $ this
      options = $.extend({}, SegmentedControl.DEFAULTS, data, typeof option == 'object' && option)
      data = $this.data('axa.segmentedControl')

      if not data
        data = new SegmentedControl this, options
        $this.data 'axa.segmentedControl', data

  # Plugin registration
  $.fn.segmentedControl = Plugin
  $.fn.segmentedControl.Constructor = SegmentedControl

  # DATA-API
  $(window).on 'load', () ->
    $('[data-segmentedControl]').each () ->
      $segmentedControl = $(this)
      data = $segmentedControl.data()

      Plugin.call($segmentedControl, data)

)(jQuery)
