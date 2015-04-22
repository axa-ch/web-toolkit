(($) ->

  # Public class definition
  class Autogrow

    constructor: (element, options) ->
      @element = element
      @$element = $ element
      @options = $.extend {}, options

      @init()

    init: () ->
      @minHeight = @$element.height()

      @shadow = $ '<div></div>'
      @shadow.css {
        position: 'absolute',
        top: -10000,
        left: -10000,
        width: @$element.width(),
        'font-size': @$element.css('font-size'),
        'font-family': @$element.css('font-family'),
        'font-weight': @$element.css('font-weight'),
        'line-height': @$element.css('line-height'),
        resize: 'none',
        'word-wrap': 'break-word'
      }

      @shadow.appendTo document.body

      @$element.on 'change keyup keydown', @, (event) ->
        event.data.update(event)

      $(window).resize @update
    update: (event) ->
      times: (string, number) ->
        r = ''
        while num -= 1
          r += string
        return r

      if @element
        val = @element.value.replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/&/g, '&amp;')
          .replace(/\n$/, '<br/>&nbsp;')
          .replace(/\n/g, '<br/>')
          .replace(/\s{2,}/g,(space) ->
            return times('&nbsp;', space.length - 1) + ' '
          )

        if event? and event.data? and event.data.event is 'keydown' and event.keyCode is 13
          val += '<br />'

        @shadow.css 'width', @$element.width()
        @shadow.html val

        newHeight = Math.max @shadow.height(), @minHeight

        @$element.height newHeight

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $ this
      data = $this.data('axa.autogrow')

      if not data
        data = new Autogrow this
        $this.data 'axa.autogrow', data

  # Plugin registration
  $.fn.autogrow = Plugin
  $.fn.autogrow.Constructor = Autogrow

  # DATA-API
  $(window).on 'load', () ->
    $('[data-autogrow="autogrow"]').each () ->
      $autogrow = $(this)
      Plugin.call($autogrow)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
