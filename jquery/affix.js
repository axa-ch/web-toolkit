/* global window */

import $ from 'jquery'

// Public class definition
class Affix {
  static VERSION = '1.0.0'
  static RESET = 'is-affixed is-affixed-top is-affixed-bottom'
  static DEFAULTS = {
    offset: 0,
    target: window,
  }

  constructor(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.axa.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.axa.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed = null
    this.unpin = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  getState(scrollHeight, height, offsetTop, offsetBottom) {
    const scrollTop = this.$target.scrollTop()
    const position = this.$element.offset()
    const targetHeight = this.$target.height()

    if (offsetTop !== null && this.affixed === 'top') {
      return scrollTop < offsetTop ? 'top' : false
    }

    if (this.affixed === 'bottom') {
      if (offsetTop !== null) {
        return scrollTop + this.unpin <= position.top ? false : 'bottom'
      }

      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom'
    }

    const initializing = this.affixed === null
    const colliderTop = initializing ? scrollTop : position.top
    const colliderHeight = initializing ? targetHeight : height

    if (offsetTop !== null && colliderTop <= offsetTop) {
      return 'top'
    }

    if (offsetBottom !== null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) {
      return 'bottom'
    }

    return false
  }

  getPinnedOffset() {
    if (this.pinnedOffset) {
      return this.pinnedOffset
    }

    this.$element.removeClass(Affix.RESET).addClass('is-affixed')

    const scrollTop = this.$target.scrollTop()
    const position = this.$element.offset()

    return (this.pinnedOffset = position.top - scrollTop)
  }

  checkPositionWithEventLoop() {
    return setTimeout($.proxy(this.checkPosition, this), 1)
  }

  checkPosition() {
    if (!this.$element.is(':visible')) {
      return
    }

    const height = this.$element.height()
    const { offset } = this.options
    let offsetTop = offset.top
    let offsetBottom = offset.bottom
    const scrollHeight = $('body').height()

    if (typeof offset !== 'object') { offsetBottom = offsetTop = offset }
    if (typeof offsetTop === 'function') { offsetTop = offset.top(this.$element) }
    if (typeof offsetBottom === 'function') { offsetBottom = offset.bottom(this.$element) }

    const affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed !== affix) {
      if (this.unpin !== null) {
        this.$element.css('top', '')
      }

      const affixType = `is-affixed${affix ? `-${affix}` : ''}`
      const e = $.Event(`${affixType}.axa.affix`)

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) {
        return
      }

      this.affixed = affix

      if (affix === 'bottom') {
        this.unpin = this.getPinnedOffset()
      } else {
        this.unpin = null
      }

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(`${(affixType.replace('affix', 'affixed'))}.axa.affix`)
    }

    if (affix === 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom,
      })
    }
  }
}

// Plugin definition
const Plugin = (option) => this.each(() => {
  const $this = $(this)
  let data = $this.data('axa.affix')
  const options = typeof option === 'object'

  if (!data) {
    data = new Affix(this, options)
    $this.data('axa.affix', data)
  }

  if (typeof option === 'string') {
    return data[option]()
  }

  return data
})

// Plugin registration
$.fn.affix = Plugin
$.fn.affix.Constructor = Affix

// DATA-API
$(window).on('load', () =>
  $('[data-spy="affix"]').each(() => {
    const $spy = $(this)
    const data = $spy.data()

    data.offset = data.offset || {}

    if (data.offsetBottom !== null) {
      data.offset.bottom = data.offsetBottom
    }
    if (data.offsetTop !== null) {
      data.offset.top = data.offsetTop
    }

    Plugin.call($spy, data)
  })
)

//! Copyright AXA Versicherungen AG 2015
