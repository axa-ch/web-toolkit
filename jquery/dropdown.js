import $ from 'jquery'

class Dropdown {
  constructor(element) {
    this.$element = $(element)

    this.$label = this.$element.find('[data-label]')
    this.$text = this.$element.find('[data-text]')
    this.$select = this.$element.find('[data-select]')

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
    if (e.which == 32) {
      this.$select.focus()
    }
  }

  setLabelText() {
    let value = this.$select.find('option:selected').text()
    this.$text.text(value)
  }
}

function Plugin() {
  let params = arguments

  return this.each(function () {
    let $this = $(this)
    let data = $this.data('axa.dropdown')

    if (!data) {
      data = new Dropdown(this)
      $this.data('axa.dropdown', data)
    }
  })
}

$.fn.dropdown = Plugin
$.fn.dropdown.Constructor = Dropdown

$(function () {
  $('[data-dropdown]').each(function () {
    let $dropdown = $(this)
    Plugin.call($dropdown)
  })
})

// Copyright AXA Versicherungen AG 2015
