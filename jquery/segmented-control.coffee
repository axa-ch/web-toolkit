(($) ->

  # Public class definition
  class SegmentedControl
    @DEFAULTS

    constructor: (element, options) ->
      @$element = $ element

      # TODO: Do not depend on css classes
      @$radios = @$element.find '.segmented-control__item__radio'

      @$radios.each (index, element) ->
        $radio = $ element

        $radio.data 'item.element', $radio.closest '.segmented-control__item'

      @options = $.extend {}, SegmentedControl.DEFAULTS, options

      @init()

    init: () ->
      @$radios.prop 'tabindex', '-1'
      @$element.prop 'tabindex', '0'

      @$element.addClass 'segmented-control--js'

      @setRadioState()

      @$radios.on 'change', @setRadioState

      @$element.on 'keyup', @handleKeyUp

      @$element.on 'keydown', @handleKeyDown

      @stackControlsIfNeeded()

      $('window').on 'resize', @stackControlsIfNeeded

    stackControlsIfNeeded: () ->
      @$element.removeClass 'segmented-control--stacked'

      if @$element.outerWidth() >= @$element.parent().innerWidth()
        @$element.addClass 'segmented-control--stacked'

    # Spacewar will activate first item if none is active
    handleKeyUp: (e) =>
      if e.which == 32
        e.preventDefault()
        if @$radios.filter(':checked').length == 0
          $first = $ @$radios[0]
          $first.prop 'checked', true
          $first.change()

    # Arrows will activate the next/previous radio
    handleKeyDown: (e) =>
      switch e.which
        # prevent scrolling
        when 32
          e.preventDefault()
        # left / up
        when 37, 38
          e.preventDefault()

          $checked = $ @$radios.filter(':checked')

          if $checked.length != 0
            $previous = $ @$radios[@$radios.index($checked) - 1]

            if $previous? && $previous.length != 0
              $previous.prop 'checked', true
              $previous.change()

        # right / down
        when 39, 40
          e.preventDefault()

          $checked = $ @$radios.filter(':checked')

          # check second radio when none is checked
          if $checked.length == 0
            $first = $ @$radios[1]

            if $first? & $first.length != 0
              $first.prop 'checked', true
              $first.change()

          else
            $next = $ @$radios[@$radios.index($checked) + 1]

            if $next? && $next.length != 0
              $next.prop 'checked', true
              $next.change()


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
    $('[data-segmented-control]').each () ->
      $segmentedControl = $(this)
      data = $segmentedControl.data()

      Plugin.call($segmentedControl, data)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
