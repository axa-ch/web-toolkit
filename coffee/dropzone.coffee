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
        event.data.$element.addClass 'file-dropzone--dragover'

      @$element.bind 'dragleave', @, (event) ->
        event.preventDefault()
        event.data.$element.removeClass 'file-dropzone--dragover'

      @$element.on 'drop', @, (event) ->
        event.preventDefault()
        event.data.$element.removeClass 'file-dropzone--dragover'

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
  $.fn.autogrow = Plugin
  $.fn.autogrow.Constructor = Dropzone

  # DATA-API
  $(window).on 'load', () ->
    $('[data-dropzone="dropzone"]').each () ->
      $dropzone = $(this)
      Plugin.call($dropzone)

)(jQuery)
