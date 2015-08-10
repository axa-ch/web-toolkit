(($) ->

  # only one window size stream for all Example instances
  resizes = $ window
    .asEventStream 'resize'

  class Example
    constructor: (el, options) ->
      @$el = $ el
      do @init

    init: ->
      @$frame = @$el.find '[data-example-iframe]'
      @$mobile = @$el.find '[data-example-mobile]'
      @$tablet = @$el.find '[data-example-tablet]'
      @$desktop = @$el.find '[data-example-desktop]'

      # we need both an initial resize and click
      initialResize = Bacon.once window.innerWidth
      initialClick = Bacon.once window.innerWidth
        .map @mapWidthToViewport

      # viewport that we explicitly switched to
      @clickedTo = initialClick
        .merge @$mobile.asEventStream('click').map 'mobile'
        .merge @$tablet.asEventStream('click').map 'tablet'
        .merge @$desktop.asEventStream('click').map 'desktop'
        .skipDuplicates()
        .toProperty()

      # viewport that we sized our browser into
      @resizedTo = resizes
        .map => @$frame.width()
        .merge initialResize
        .throttle 25
        .map @mapWidthToViewport
        .skipDuplicates()
        .toProperty()

      # on each resizing change
      @clickedTo
        .sampledBy @resizedTo, (resizedTo, clickedTo) =>
          resizedToOrder = @viewportToOrder resizedTo
          clickedToOrder = @viewportToOrder clickedTo
          return clickedTo if clickedToOrder <= resizedToOrder
          return resizedTo
        .onValue (viewport) =>
          @setMode viewport
          @setViewport viewport

      # on each clicking change
      @resizedTo
        .sampledBy @clickedTo, (clickedTo, resizedTo) =>
          resizedToOrder = @viewportToOrder resizedTo
          clickedToOrder = @viewportToOrder clickedTo
          return clickedTo if clickedToOrder <= resizedToOrder
          return resizedTo
        .onValue (viewport) =>
          @setMode viewport
          @setViewport viewport

    mapWidthToViewport: (width) ->
      return 'mobile' if width <= 320
      return 'tablet' if width <= 768
      return 'desktop'

    mapViewportToWidth: (viewport) ->
      return '320px' if viewport == 'mobile'
      return '768px' if viewport == 'tablet'
      return '100%'

    viewportToOrder: (viewport) ->
      return 0 if viewport == 'mobile'
      return 1 if viewport == 'tablet'
      return 2

    setViewport: (viewport) ->
      @$frame.css 'max-width', @mapViewportToWidth viewport

    setMode: (viewport) ->
      @$mobile.toggleClass 'is-active', viewport == 'mobile'
      @$tablet.toggleClass 'is-active', viewport == 'tablet'
      @$desktop.toggleClass 'is-active', viewport == 'desktop'

  $ ->
    $ '[data-example]'
      .each (i, el) => new Example el

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
