/* global window */

import $ from 'jquery'

// Public class definition
class Autocomplete {

  constructor(element, options) {
    this.element = element
    this.$element = $(element)
    this.options = $.extend({}, options)
    this.filtered = this.options.source

    if (this.filtered == null) {
      this.filtered = []
    }

    this.value = ''
    this.isMouseOver = false

    this.$dropdown = $('<div class="autocomplete__suggestions"></div>')
    this.$dropdown.hide()
    this.$element.after(this.$dropdown)

    this.$element.on('keyup', this, event => event.data.filter(event)
    )

    this.$element.on('blur', this, (event) => {
      if (!event.data.isMouseOver) {
        event.data.$dropdown.hide()
      }
    }
    )
  }

  filter() {
    if (this.value !== this.element.value) {
      this.value = this.element.value
      this.filtered = (this.options.source.filter((text) => text.indexOf(this.value) > -1).map((text) => text))

      this.$dropdown.empty()

      for (let i = 0; i < this.filtered.length; i++) {
        const text = this.filtered[i]
        this.$dropdown.append(this.createItem(text))
      }

      this.$dropdown.show()
    }
  }

  createItem(text) {
    const item = $(`<div class="autocomplete__suggestions__item">${text}</div>`)
    item.on('mouseover', this, (event) => {
      event.data.isMouseOver = true
      $(event.target).addClass('autocomplete__suggestions__item--selected')
    })
    .on('mouseout', this, (event) => {
      event.data.isMouseOver = false
      $(event.target).removeClass('autocomplete__suggestions__item--selected')
    })
    .on('click', this, event => event.data.selectItem(event))

    return item
  }

  selectItem(event) {
    this.element.value = event.target.textContent
    this.$dropdown.hide()
  }
}

// Plugin definition
const Plugin = (option) => this.each(() => {
  const $this = $(this)
  let data = $this.data('axa.autocomplete')
  const options = $.extend({}, data, typeof option === 'object' && option)

  if (!data) {
    data = new Autocomplete(this, options)
    return $this.data('axa.autocomplete', data)
  }

  return data
})

// Plugin registration
$.fn.autocomplete = Plugin
$.fn.autocomplete.Constructor = Autocomplete

// DATA-API
$(window).on('load', () =>
  $('[data-autocomplete]').each(() => {
    const $autocomplete = $(this)
    Plugin.call($autocomplete)
  })
)

//! Copyright AXA Versicherungen AG 2015
