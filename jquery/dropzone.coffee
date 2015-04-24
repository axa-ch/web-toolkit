(($) ->

  # Public class definition
  class Dropzone

    constructor: (element, options) ->
      @element = element
      @$element = $ element
      @options = $.extend {}, options

      @init()

    init: () ->
      @$element.bind 'dragover', @, (event) ->
        event.preventDefault()
        event.data.$element.addClass 'dropzone__container--dragover'

      @$element.bind 'dragleave', @, (event) ->
        event.preventDefault()
        event.data.$element.removeClass 'dropzone__container--dragover'

      @$element.on 'drop', @, (event) ->
        event.preventDefault()
        event.data.$element.removeClass 'dropzone__container--dragover'

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $ this
      data = $this.data('axa.dropzone')

      if not data
        data = new Dropzone this
        $this.data 'axa.dropzone', data

  # Plugin registration
  $.fn.dropzone = Plugin
  $.fn.dropzone.Constructor = Dropzone

  # DATA-API
  $(window).on 'load', () ->
    $('[data-dropzone="dropzone"]').each () ->
      $dropzone = $(this)
      Plugin.call($dropzone)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
