(($) ->

  # Public class definition
  class Popover
    constructor: (element, options) ->
      @element = element
      @$element = $ element
      @options = $.extend {}, options

      @$target = $ @$element.data('popover')
      @$closeIcon = @$target.find '.popover__close'

      @isOpen = false

      @$element.on 'click', @, @toggle
      @$closeIcon.on 'click', @, @toggle

      @position()

      $(window).on 'resize', @position

    toggle: (event) ->
      event.data.isOpen = not event.data.isOpen
      event.data.position()
      event.data.$target.toggleClass 'is-active'

    position: () =>
      $box = @$target.find '.popover__box'
      $tail = @$target.find '.popover__tail'

      #todo proper workaround for ie9
      isSmall = false
      if window.matchMedia? #not supported by IE9
        isSmall = not window.matchMedia('(min-width: 768px)').matches
      else #this makes it kinda work in IE9
        isSmall = $(window).outerWidth() < 768

      if isSmall
        if @isOpen
          $('body').addClass 'is-modal-open'
        else
          $('body').removeClass 'is-modal-open'

        $box.css { top: 0, left: 0 }
      else
        $('body').removeClass 'is-modal-open'
        #box
        maxOffsetTop = $(document).height() - $box.outerHeight()
        maxOffsetLeft = $(document).width() - $box.outerWidth() - 20

        offset = { top: 0, left: 0 }
        offset.top = @$element.offset().top + @$element.outerHeight() + 20
        offset.left = @$element.offset().left

        if offset.left > maxOffsetLeft
          offset.left = maxOffsetLeft

        #tail
        $tail.removeClass 'popover__tail--top popover__tail--bottom'
        tailOffset = { top: 0, left: 0 }
        tailOffset.top = @$element.offset().top + @$element.outerHeight() - 20
        tailOffset.left = @$element.offset().left + @$element.outerWidth() / 2 - 20
        tailClass = 'popover__tail--top'

        #position above if not enough space below
        if offset.top > maxOffsetTop
          offset.top = @$element.offset().top - $box.outerHeight() - 20
          tailOffset.top = @$element.offset().top - 20
          tailClass = 'popover__tail--bottom'

        $box.offset offset
        $tail.addClass tailClass
        $tail.offset tailOffset

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
