/* global window, document */

import $ from 'jquery'
import isAnimationSupported from './is-animation-supported'
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
  Plugin('spinner', IE9Spinner)
}

//! Copyright AXA Versicherungen AG 2015
