(($) ->

  # Public class definition
  class Popover
    constructor: (element, options) ->
      @element = element
      @$element = $ element
      @options = $.extend {}, options

      @$target = $ @$element.data('popover')

      console.log @$element
      console.log @$target

      @$target.css 'visibility', 'hidden'

      @$element.on 'click', @, (event) ->
        event.data.$target.css 'visibility',
          if event.data.$target.css('visibility') == 'visible' then 'hidden' else 'visible'

      @position()

      $(window).on 'resize', @position

    position: () =>
      @$element.outerWidth()
      @$element.outerHeight()
      @$element.offset().top
      box = @$target.find '.popover__box'
      tail = @$target.find '.popover__tail'

      #todo proper workaround for ie9
      isSmall = false
      if window.matchMedia? #not supported by IE9
        isSmall = not window.matchMedia('(min-width: 768px)').matches
        console.log isSmall
      else #this makes it kinda work in IE9
        isSmall = $(window).outerWidth() < 768

      if isSmall
        box.offset { top: 0, left: 0 }
        console.log box.offset()
      else
        #box
        # maxOffsetTop = $(document).height() - box.outerHeight()
        maxOffsetLeft = $(document).width() - box.outerWidth() - 20

        desiredOffset = { top: 0, left: 0 }
        desiredOffset.top = @$element.offset().top + @$element.outerHeight() + 20
        desiredOffset.left = @$element.offset().left

        # if desiredOffset.top > maxOffsetTop
        #   desiredOffset.top = maxOffsetTop
        if desiredOffset.left > maxOffsetLeft
          desiredOffset.left = maxOffsetLeft

        box.offset desiredOffset

        #tail
        tailOffset = { top: 0, left: 0 }
        tailOffset.top = @$element.offset().top + @$element.outerHeight() - 20
        tailOffset.left = @$element.offset().left + @$element.outerWidth() / 2 - 20

        tail.addClass 'popover__tail--top'
        tail.offset tailOffset

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      options = $.extend({}, data, typeof option == 'object' && option)
      $this = $ this
      data = $this.data('axa.popover')

      if not data
        data = new Popover this, options
        $this.data 'axa.popover', data

  # Plugin registration
  $.fn.popover = Plugin
  $.fn.popover.Constructor = Popover

  # DATA-API
  $(window).on 'load', () ->
    $('[data-popover]').each () ->
      $popover = $(this)

      Plugin.call($popover)

)(jQuery)
