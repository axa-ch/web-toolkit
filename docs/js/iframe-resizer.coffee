$ = require 'jquery'
iFrameResize = require 'iframe-resizer'

class IFrameResizer
  constructor: (el, options) ->
    @$el = $ el

    iFrameResize {
      autoResize: true
      resizeFrom: 'child'
      checkOrigin: false
      sizeHeight: true
      maxHeight: options.maxHeight || 'infinity'
      minHeight: options.minHeight || 0
      heightCalculationMethod: 'lowestElement'
    }, @$el[0]

Plugin = (option) ->
  $el = $(this)
  data = $el.data 'axa.iframe-resizer'
  options = typeof option == 'object' && option

  # there's no instance yet
  if not data
    data = new IFrameResizer this, options
    $el.data 'axa.iframe-resizer', data

$ ->
  $('[data-iframe-resizer]').each ->
    $el = $(@)
    data = do $el.data

    Plugin.call $el, data

#! Copyright AXA Versicherungen AG 2015
