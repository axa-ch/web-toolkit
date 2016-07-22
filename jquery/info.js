/* global window */

import $ from 'jquery'

// Public class definition
class Info {
  constructor(element, options) {
    this.$element = $(element)
    // @options = $.extend {}, options

    let selector = this.$element.data('target')
    if (selector == null) { selector = options.target }

    this.$target = $(selector)

    this.$element.on('click', this, event => event.data.toggle(event)
    )
  }

  toggle() {
    this.$target.slideToggle()
    return this.$element.toggleClass('is-active')
  }
}

// Plugin definition
function Plugin(option) {
  this.each(() => {
    const $this = $(this)
    let data = $this.data('axa.info')
    const options = $.extend({}, data, typeof option === 'object' && option)

    if (!data) {
      data = new Info(this, options)
      $this.data('axa.info', data)
    }
  })
}

// Plugin registration
$.fn.info = Plugin
$.fn.info.Constructor = Info

// DATA-API
$(window).on('load', () =>
  $('[data-info]').each(() => {
    const $info = $(this)
    Plugin.call($info)
  })
)

//! Copyright AXA Versicherungen AG 2015
