import $ from 'jquery'
import Plugin from './plugin'

class ProgressBar {
  constructor(element, options) {
    this.$element = $(element)

    this.defaults = {
      max: 4,
    }

    this.options = $.extend({}, this.defaults, options)

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
