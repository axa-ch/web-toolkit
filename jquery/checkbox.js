/* global window */

import $ from 'jquery'
import registerPlugin from './register-plugin'

// Public class definition
class Checkbox {
  static DEFAULTS

  constructor(element, options) {
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.setCheckboxState = this.setCheckboxState.bind(this)
    this.handleCustomColorBG = this.handleCustomColorBG.bind(this)
    this.$element = $(element)

    // TODO: Do not depend on css classes
    this.$checkbox = this.$element.find('.checkbox__checkbox')
    this.$label = this.$element.find('.checkbox__label')

    this.options = options

    this.init()
  }

  init() {
    this.$checkbox.attr('tabindex', '-1')
    this.$label.attr('tabindex', '0')

    this.$element.addClass('checkbox--js')

    this.setCheckboxState()

    this.$checkbox.off('change.axa.checkbock')
      .on('change.axa.checkbock', this.setCheckboxState)

    this.$label.off('keyup.axa.checkbock')
      .on('keyup.axa.checkbock', this.handleKeyUp)

    if (typeof this.options.color !== 'undefined') {
      this.handleCustomColorBG()
      this.$element.css({ 'border-color': this.options.color })
      this.$element.off('click.axa.checkbock')
        .on('click.axa.checkbock', this.handleCustomColorBG)
    }
  }

  handleCustomColorBG() {
    if (this.$checkbox.is(':checked')) {
      this.$element.css({
        'background-color': this.options.color,
        color: '#fff',
      })
    } else {
      this.$element.css({
        'background-color': '#fff',
        color: '#000',
      })
    }
  }

  // Handle spacebar to toggle the checkbox
  handleKeyUp(e) {
    if (e.which === 32) {
      // prevent scrolling
      e.preventDefault()

      this.$checkbox.prop('checked', !(this.$checkbox.is(':checked')))

      // Emit a change event manually
      this.$checkbox.change()
    }
  }

  // Updates the UI according to the checkbox state
  setCheckboxState() {
    if (this.$checkbox.is(':checked')) {
      this.$element.addClass('is-active')
    } else {
      this.$element.removeClass('is-active')
    }
  }
}

// Plugin definition
registerPlugin('checkbox', Checkbox)

//! Copyright AXA Versicherungen AG 2015
