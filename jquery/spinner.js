/* global window, document */

import $ from 'jquery'
import isAnimationSupported from './is-animation-supported'
import Plugin from './plugin'

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
  // eslint-disable-next-line new-cap
  Plugin('spinner', Spinner)
}

//! Copyright AXA Versicherungen AG 2015
