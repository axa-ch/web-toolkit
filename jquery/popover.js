/* global window, document */

import $ from 'jquery'

// Public class definition
class Popover {
  constructor(element, options) {
    this.position = this.position.bind(this)
    this.element = element
    this.$element = $(element)
    this.options = {
      ...options,
    }

    this.$target = $(this.$element.data('popover'))
    this.$closeIcon = this.$target.find('.popover__close')

    this.isOpen = false

    this.$element.on('click', this, this.toggle)
    this.$closeIcon.on('click', this, this.toggle)

    this.position()

    $(window).on('resize', this.position)
  }

  toggle(event) {
    event.data.isOpen = !event.data.isOpen
    event.data.position()
    event.data.$target.toggleClass('is-active')
  }

  position() {
    const $box = this.$target.find('.popover__box')
    const $tail = this.$target.find('.popover__tail')

    // @todo proper workaround for ie9
    let isSmall = false

    if (window.matchMedia != null) { // not supported by IE9
      isSmall = !window.matchMedia('(min-width: 768px)').matches
    } else { // this makes it kinda work in IE9
      isSmall = $(window).outerWidth() < 768
    }

    if (isSmall) {
      if (this.isOpen) {
        $('body').addClass('is-modal-open')
      } else {
        $('body').removeClass('is-modal-open')
      }

      return $box.css({ top: 0, left: 0 })
    }

    $('body').removeClass('is-modal-open')
    // box
    const $document = $(document)
    const $element = this.$element
    const maxOffsetTop = $document.height() - $box.outerHeight()
    const maxOffsetLeft = $document.width() - $box.outerWidth() - 20

    const offset = { top: 0, left: 0 }

    offset.top = $element.offset().top + $element.outerHeight() + 20
    offset.left = $element.offset().left

    if (offset.left > maxOffsetLeft) {
      offset.left = maxOffsetLeft
    }

    // tail
    $tail.removeClass('popover__tail--top popover__tail--bottom')

    const tailOffset = { top: 0, left: 0 }

    tailOffset.top = ($element.offset().top + $element.outerHeight()) - 20
    tailOffset.left = ($element.offset().left + ($element.outerWidth() / 2)) - 20

    let tailClass = 'popover__tail--top'

    // position above if not enough space below
    if (offset.top > maxOffsetTop) {
      offset.top = $element.offset().top - $box.outerHeight() - 20
      tailOffset.top = $element.offset().top - 20
      tailClass = 'popover__tail--bottom'
    }

    $box.offset(offset)
    $tail.addClass(tailClass)

    return $tail.offset(tailOffset)
  }
}

// Plugin definition
function Plugin(option) {
  this.each(function () {
    const $this = $(this)
    let data = $this.data('axa.popover')
    const options = $.extend({}, data, typeof option === 'object' && option)

    if (!data) {
      data = new Popover(this, options)
      $this.data('axa.popover', data)
    }
  })
}

// Plugin registration
$.fn.popover = Plugin
$.fn.popover.Constructor = Popover

// DATA-API
$(window).on('load', () =>
  $('[data-popover]').each(function () {
    const $popover = $(this)
    Plugin.call($popover)
  })
)

//! Copyright AXA Versicherungen AG 2015
