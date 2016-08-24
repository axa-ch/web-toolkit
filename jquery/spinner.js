/* global window, document */

import $ from 'jquery'
import isAnimationSupported from './is-animation-supported'
import registerPlugin from './register-plugin'

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

if (isAnimationSupported()) {
  // Plugin definition
  registerPlugin('spinner', Spinner)
}

//! Copyright AXA Versicherungen AG 2015
