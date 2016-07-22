/* global window, document */

import $ from 'jquery'

// Public class definition
class IE9Spinner {
  constructor(element) {
    this.$element = $(element)

    this.$element.addClass('is-fallback-active')
  }
}

// Plugin definition
function Plugin(option) {
  this.each(function () {
    const $this = $(this)
    let data = $this.data('axa.ie9Spinner')
    const options = $.extend({}, data, typeof option === 'object' && option)

    if (!data) {
      data = new IE9Spinner(this, options)
      $this.data('axa.ie9Spinner', data)
    }
  })
}

// Plugin registration
$.fn.ie9Spinner = Plugin
$.fn.ie9Spinner.Constructor = IE9Spinner

// DATA-API
$(window).on('load', () => {
  // check for support of the animation property
  const elm = document.createElement('div')
  const properties = [
    'animation',
    'WebkitAnimation',
    'MozAnimation',
    'msAnimation',
    'OAnimation',
  ]

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]

    // if the animation property is supported, exit
    if (elm.style[property] != null) {
      return
    }
  }

  // animation property not supported, activate fallback on all spinners
  $('[data-spinner]').each(function () {
    const $spinner = $(this)
    Plugin.call($spinner)
  })
})

//! Copyright AXA Versicherungen AG 2015
