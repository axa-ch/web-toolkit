/* global window */

import $ from 'jquery'
import Plugin from './plugin'

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
      // eslint-disable-next-line no-param-reassign
      event.data.isMouseOver = true
      $(event.target).addClass('autocomplete__suggestions__item--selected')
    })
    .on('mouseout', this, (event) => {
      // eslint-disable-next-line no-param-reassign
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
// eslint-disable-next-line new-cap
Plugin('autocomplete', Autocomplete)

//! Copyright AXA Versicherungen AG 2015
