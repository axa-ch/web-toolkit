(($) ->

  # Public class definition
  class Affix
    @VERSION = '1.0.0'

    @RESET = 'is-affixed is-affixed-top is-affixed-bottom'

    @DEFAULTS:
      offset: 0,
      target: window

    constructor: (element, options) ->
      @options = $.extend({}, Affix.DEFAULTS, options)

      @$target = $(@options.target)
        .on('scroll.axa.affix.data-api', $.proxy(@checkPosition, this))
        .on('click.axa.affix.data-api', $.proxy(@checkPositionWithEventLoop, this))

      @$element = $(element)
      @affixed = null
      @unpin = null
      @pinnedOffset = null

      @checkPosition()

    getState: (scrollHeight, height, offsetTop, offsetBottom) ->
      scrollTop = @$target.scrollTop()
      position = @$element.offset()
      targetHeight = @$target.height()

      if offsetTop != null && @affixed == 'top'
        return if scrollTop < offsetTop then 'top' else false

      if @affixed == 'bottom'
        if offsetTop != null
          return if scrollTop + @unpin <= position.top then false else 'bottom'

        return if scrollTop + targetHeight <= scrollHeight - offsetBottom then false else 'bottom'

      initializing = @affixed == null
      colliderTop = if initializing then scrollTop else position.top
      colliderHeight = if initializing then targetHeight else height

      if offsetTop != null && colliderTop <= offsetTop
        return 'top'

      if offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)
        return 'bottom'

      return false

    getPinnedOffset: () ->
      if @pinnedOffset
        return @pinnedOffset

      @$element.removeClass(Affix.RESET).addClass('is-affixed')

      scrollTop = @$target.scrollTop()
      position = @$element.offset()

      return (@pinnedOffset = position.top - scrollTop)

    checkPositionWithEventLoop: () ->
      setTimeout($.proxy(@checkPosition, this), 1)

    checkPosition: () ->
      if !@$element.is(':visible')
        return

      height = @$element.height()
      offset = @options.offset
      offsetTop = offset.top
      offsetBottom = offset.bottom
      scrollHeight = $('body').height()

      offsetBottom = offsetTop = offset if typeof offset != 'object'
      offsetTop = offset.top(@$element) if typeof offsetTop == 'function'
      offsetBottom = offset.bottom(@$element) if typeof offsetBottom == 'function'

      affix = @getState(scrollHeight, height, offsetTop, offsetBottom)

      if @affixed != affix
        @$element.css('top', '') if @unpin != null

        affixType = 'is-affixed' + if affix then '-' + affix else ''
        e = $.Event(affixType + '.axa.affix')

        @$element.trigger(e)

        if e.isDefaultPrevented()
          return

        @affixed = affix

        if affix == 'bottom'
          @unpin = @getPinnedOffset()
        else
          @unpin = null

        @$element
          .removeClass(Affix.RESET)
          .addClass(affixType)
          .trigger(affixType.replace('affix', 'affixed') + '.axa.affix')

      if affix == 'bottom'
        @$element.offset
          top: scrollHeight - height - offsetBottom

  # Plugin definition
  Plugin = (option) ->
    @each () ->
      $this = $(this)
      data = $this.data('axa.affix')
      options = typeof option == 'object' && option

      $this.data('axa.affix', (data = new Affix(this, options))) if !data
      data[option]() if typeof option == 'string'

  # Plugin registration
  $.fn.affix = Plugin
  $.fn.affix.Constructor = Affix

  # DATA-API
  $(window).on 'load', () ->
    $('[data-spy="affix"]').each () ->
      $spy = $(this)
      data = $spy.data()

      data.offset = data.offset || {}
      data.offset.bottom = data.offsetBottom if data.offsetBottom != null
      data.offset.top = data.offsetTop if data.offsetTop != null

      Plugin.call($spy, data)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
