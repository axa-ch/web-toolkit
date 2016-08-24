import $ from 'jquery'
import registerPlugin from './register-plugin'

class CheckboxGroup {
  static DEFAULTS = {
    minLength: 5,
    preferredColumnLength: 5,
    maxColumnCount: 3,
  }

  constructor(element, options) {
    this.$element = $(element)

    this.options = options

    this.init()
  }

  init() {
    const items = this.$element.children()
    const length = items.length
    let $container
    let $row
    let columnCnt
    let maxItemsPerColumn
    let i
    let j

    // Only add columns if there are enough items:
    if (length > this.options.minLength) {
      this.$element.html('')

      $container = $('<div />')
        .addClass('container')
        .appendTo(this.$element)

      $row = $('<div />')
        .addClass('row')
        .appendTo($container)

      columnCnt = Math.ceil(length / this.options.preferredColumnLength)

      if (columnCnt > this.options.maxColumnCount) {
        columnCnt = this.options.maxColumnCount
      }

      maxItemsPerColumn = Math.ceil(length / columnCnt)

      for (i = 1; i <= columnCnt; i++) {
        const $column = $('<div />')
          .addClass(`column column--12 column--md-6 column--lg-${(12 / columnCnt)}`)
          .css({ 'margin-bottom': '16px' })
          .appendTo($row)

        for (j = (i - 1) * maxItemsPerColumn; j <= i * maxItemsPerColumn; j++) {
          if (typeof items[j] !== 'undefined') {
            $(items[j]).appendTo($column)
          }
        }
      }
    }
  }
}

// Plugin definition
registerPlugin('checkbox-group', CheckboxGroup)

// Copyright AXA Versicherungen AG 2015
