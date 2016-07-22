/* global window, document */

import $ from 'jquery'

// Public class definition
class Spinner {
  constructor(element) {
    this.$element = $(element)
    this.$defaults = $('[data-default]')
    this.$fallbacks = $('[data-fallback]')

    this.fallback(true)
  }

  fallback(toggle) {
    this.$defaults.toggleClass('is-disabled', toggle)
    this.$fallbacks.toggleClass('is-enabled', toggle)
  }
}

// Plugin definition
const Plugin = (option, ...args) => this.each(() => {
  const $this = $(this)
  let data = $this.data('axa.spinner')

  if (!data) {
    data = new Spinner(this)
    $this.data('axa.spinner', data)
  }

  if (typeof option === 'string' && option === 'fallback') {
    data.fallback(args[0])
  }

  return data
})

// Plugin registration
$.fn.spinner = Plugin
$.fn.spinner.Constructor = Spinner

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
  $('[data-spinner="bouncy"]').each(() => {
    const $spinner = $(this)
    Plugin.call($spinner)
  })
})

//! Copyright AXA Versicherungen AG 2015
