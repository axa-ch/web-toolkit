import $ from 'jquery'

class CheckboxGroup {

  constructor(element, options) {
    this.$element = $(element)

    this.defaults = {
      'minLength': 5,
      'preferedColumnLength': 5,
      'maxColumnCount': 3
    }

    this.options = $.extend({}, this.defaults, options)

    this.init()
  }

  init() {

    var   items,
          length,
          $container,
          $row,
          columnCnt,
          maxItemsPerColumn,
          i,
          j;


    items = this.$element.children()
    length = items.length
    
    // Only add columns if there are enough items:
    if (length > this.options.minLength){
      
      this.$element.html('')
      
      $container = $('<div />')
        .addClass('container')
        .appendTo(this.$element)

      $row = $('<div />')
        .addClass('row')
        .appendTo($container)

      columnCnt = Math.ceil(length / this.options.preferedColumnLength)
      if (columnCnt > this.options.maxColumnCount) columnCnt = this.options.maxColumnCount

      maxItemsPerColumn = Math.ceil(length / columnCnt)

      for (i=1; i<=columnCnt; i++){
        
        let $column = $('<div />')
          .addClass('column column--12' + ' column--md-' + (12 / 2) + ' column--lg-' + (12 / columnCnt))
          .css({'margin-bottom': '16px'})
          .appendTo($row)

        for (j=(i-1)*maxItemsPerColumn; j<=i*maxItemsPerColumn; j++){
          if (typeof items[j] !== 'undefined') $(items[j]).appendTo($column)
        }

      }

    }
  }

}

function Plugin() {
  let params = arguments

  return this.each(function () {
    let $this = $(this)
    let data = $this.data('axa.checkbox-group')

    if (!data) {
      data = new CheckboxGroup(this)
      $this.data('axa.checkbox-group', data)
    }

    let method = params[0]
    if (typeof(method) === 'string') {
      data[method](...params.slice(1))
    }
  })
}

$.fn.checkboxGroup = Plugin
$.fn.checkboxGroup.Constructor = CheckboxGroup

$(function () {
  $('[data-checkbox-group]').each(function () {
    let $checkboxGroup = $(this)
    let data = $checkboxGroup.data()
    Plugin.call($checkboxGroup, data)
  })
})

// Copyright AXA Versicherungen AG 2015
