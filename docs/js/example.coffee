$ = require 'jquery'
Bacon = require 'baconjs'

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
    initialResize = Bacon.once @$el.width()
    initialClick = Bacon.once @$el.width()
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
      .map => @$el.width()
      .merge initialResize
      .throttle 25
      .map @mapWidthToViewport
      .skipDuplicates()
      .toProperty()

    # set viewport on resizing changes
    @clickedTo
      .sampledBy @resizedTo, (resizedTo, clickedTo) =>
        resizedToOrder = @viewportToOrder resizedTo
        clickedToOrder = @viewportToOrder clickedTo
        return clickedTo if clickedToOrder <= resizedToOrder
        return resizedTo
      .onValue (viewport) =>
        @setMode viewport
        @setViewport viewport

    # set availability on resizing changes
    @resizedTo
      .onValue (viewport) => @setModeAvailability viewport

    # set viewport on clicking changes
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
    return 'mobile' if width < 768
    return 'tablet' if width < 980
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

  setModeAvailability: (maxViewport) ->
    maxViewportOrder = @viewportToOrder maxViewport

    @$mobile.toggleClass 'is-available', maxViewportOrder > 0
    @$tablet.toggleClass 'is-available', maxViewportOrder >= 1
    @$desktop.toggleClass 'is-available', maxViewportOrder >= 2

$ ->
  $ '[data-example]'
    .each (i, el) => new Example el

#! Copyright AXA Versicherungen AG 2015
