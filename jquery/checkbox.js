/* global window */

import $ from 'jquery'

// Public class definition
class Checkbox {
  static DEFAULTS

  constructor(element, options) {
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.setCheckboxState = this.setCheckboxState.bind(this)
    this.$element = $(element)

    // TODO: Do not depend on css classes
    this.$checkbox = this.$element.find('.checkbox__checkbox')
    this.$label = this.$element.find('.checkbox__label')

    this.options = $.extend({}, Checkbox.DEFAULTS, options)

    this.init()
  }

  init() {
    this.$checkbox.attr('tabindex', '-1')
    this.$label.attr('tabindex', '0')

    this.$element.addClass('checkbox--js')

    this.setCheckboxState()

    this.$checkbox.on('change', this.setCheckboxState)

    this.$label.on('keyup', this.handleKeyUp)

    if (typeof this.options.color !== 'undefined') {
      this.handleCustomColorBG()
      this.$element.css({ 'border-color': this.options.color })
      this.$element.on('click', this.handleCustomColorBG.bind(this))
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
const Plugin = (option) => this.each(() => {
  const $this = $(this)
  let data = $this.data('axa.checkbox')
  const options = $.extend({}, Checkbox.DEFAULTS, data, typeof option === 'object' && option)

  if (!data) {
    data = new Checkbox(this, options)
    return $this.data('axa.checkbox', data)
  }

  return data
})

// Plugin registration
$.fn.checkbox = Plugin
$.fn.checkbox.Constructor = Checkbox

// DATA-API
$(window).on('load', () =>
  $('[data-checkbox]').each(() => {
    const $checkbox = $(this)
    const data = $checkbox.data()

    Plugin.call($checkbox, data)
  })
)

//! Copyright AXA Versicherungen AG 2015
