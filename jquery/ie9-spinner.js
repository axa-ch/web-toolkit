/* global window, document */

import $ from 'jquery'
import Plugin from './plugin'

// Public class definition
class IE9Spinner {
  constructor(element) {
    this.$element = $(element)

    this.$element.addClass('is-fallback-active')
  }
}

if (isAnimationSupported()) {
  // Plugin definition
  // eslint-disable-next-line new-cap
  Plugin('ie9Spinner', IE9Spinner)
}

function isAnimationSupported() {
  // check for support of the animation property
  const elm = document.createElement('div')
  const properties = [
    'animation',
    'WebkitAnimation',
    'MozAnimation',
    'msAnimation',
    'OAnimation',
  ]
  const length = properties.length

  for (let i = 0; i < length; i++) {
    const property = properties[i]

    // if the animation property is supported, exit
    if (elm.style[property] != null) {
      return true
    }
  }

  return false
}

//! Copyright AXA Versicherungen AG 2015
