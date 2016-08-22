import $ from 'jquery'
import Plugin from './plugin'

class ProgressBar {
  static DEFAULTS = {
    max: 4,
  }

  constructor(element, options) {
    this.$element = $(element)

    this.options = options

    this.init()
  }

  init() {
    if (this.$element.find('ul').children().length > this.options.max) {
      this.$element.addClass('progress-bar__long')
    } else {
      this.$element.removeClass('progress-bar__long')
    }
  }
}

// Plugin definition
// eslint-disable-next-line new-cap
Plugin('progress-bar', ProgressBar)

// Copyright AXA Versicherungen AG 2015
