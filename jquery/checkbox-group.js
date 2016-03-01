import $ from 'jquery'

class CheckboxGroup {
  constructor(element) {
    this.$element = $(element)
    this.init()
  }

  init() {
    var items = this.$element.children()
    var length = items.length
    
    // Only add columns if there are enough items:
    if (length > 5){
      
      this.$element.html('')

      var $row = $('<div />')
        .addClass('row')
        .appendTo(this.$element)

      var columnCnt = Math.ceil(length / 5)
      if (columnCnt > 3) columnCnt = 3

      var maxItemsPerColumn = Math.ceil(length / columnCnt)

      for (var i=1; i<=columnCnt; i++){
        
        let $column = $('<div />')
          .addClass('column column--' + (12 / columnCnt))
          .appendTo($row)

        for (var j=(i-1)*maxItemsPerColumn; j<=i*maxItemsPerColumn; j++){
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
    Plugin.call($checkboxGroup)
  })
})

// Copyright AXA Versicherungen AG 2015
