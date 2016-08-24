/* global window */

import $ from 'jquery'
import registerPlugin from './register-plugin'

// Public class definition
class Dropzone {
  constructor(element, options) {
    this.element = element
    this.$element = $(element)
    this.options = options

    this.init()
  }

  init() {
    this.$element.bind('dragover', this, (event) => {
      event.preventDefault()
      event.data.$element.addClass('dropzone__container--dragover')
    })

    this.$element.bind('dragleave', this, (event) => {
      event.preventDefault()
      event.data.$element.removeClass('dropzone__container--dragover')
    })

    return this.$element.on('drop', this, (event) => {
      event.preventDefault()
      event.data.$element.removeClass('dropzone__container--dragover')
    })
  }
}

// Plugin definition
registerPlugin('dropzone', Dropzone)

//! Copyright AXA Versicherungen AG 2015
