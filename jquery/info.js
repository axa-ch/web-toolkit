/* global window */

import $ from 'jquery'
import registerPlugin from './register-plugin'

// Public class definition
class Info {
  constructor(element, options) {
    this.$element = $(element)
    // @options = $.extend {}, options

    let selector = this.$element.data('target')
    if (selector == null) { selector = options.target }

    this.$target = $(selector)

    this.$element.on('click', this, event => event.data.toggle(event))
  }

  toggle(event) {
    event.preventDefault()
    this.$target.slideToggle()
    return this.$element.toggleClass('is-active')
  }
}

// Plugin definition
registerPlugin('info', Info)

//! Copyright AXA Versicherungen AG 2015
