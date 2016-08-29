/* global window, document */

import $ from 'jquery'
import isAnimationSupported from './is-animation-supported'
import registerPlugin from './register-plugin'

// Public class definition
class IE9Spinner {
  constructor(element) {
    this.$element = $(element)

    this.$element.addClass('is-fallback-active')
  }
}

if (isAnimationSupported()) {
  // Plugin definition
  registerPlugin('spinner', IE9Spinner)
}

//! Copyright AXA Versicherungen AG 2015
