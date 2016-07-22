import $ from 'jquery'

class ProgressBar {
  constructor(element, options) {
    this.$element = $(element)

    this.defaults = {
      max: 4,
    }

    this.options = $.extend({}, this.defaults, options)

    this.init()
  }

  init() {
    if (this.$element.find('ul').children().length > this.options.max) {
      this.$element.addClass('progress-bar__long')
    } else {
      this.$element.removeClass('progress-bar__long')
    }
  }

}

function Plugin(method, ...args) {
  this.each(() => {
    const $this = $(this)
    let data = $this.data('axa.progress-bar')

    if (!data) {
      data = new ProgressBar(this)
      $this.data('axa.progress-bar', data)
    }

    if (typeof(method) === 'string') {
      data[method](...args)
    }
  })
}

$.fn.progressBar = Plugin
$.fn.progressBar.Constructor = ProgressBar

$(() => {
  $('[data-progress-bar]').each(() => {
    const $progressBar = $(this)
    const data = $progressBar.data()
    Plugin.call($progressBar, data)
  })
})

// Copyright AXA Versicherungen AG 2015
