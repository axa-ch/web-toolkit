import $ from 'jquery'
import Plugin from './plugin'

class Dropdown {
  constructor(element) {
    this.$element = $(element)

    this.$label = this.$element.find('[data-dropdown-label]')
    this.$text = this.$element.find('[data-dropdown-text]')
    this.$select = this.$element.find('[data-dropdown-select]')

    this.init()
  }

  init() {
    this.$element.attr('tabindex', '0')
    this.$select.attr('tabindex', '-1')

    this.$element.addClass('is-enhanced')
    this.$label.addClass('is-enhanced')
    this.$text.addClass('is-enhanced')
    this.$select.addClass('is-enhanced')
    this.setLabelText()

    this.$element.on('keydown', (e) => this.handleKeyDown(e))
    this.$select.on('change', () => this.setLabelText())
  }

  handleKeyDown(e) {
    if (e.which === 32) {
      this.$select.focus()
    }
  }

  setLabelText() {
    const value = this.$select.find('option:selected').text()
    this.$text.text(value)
  }
}

// Plugin definition
// eslint-disable-next-line new-cap
Plugin('dropdown', Dropdown)

// Copyright AXA Versicherungen AG 2015
