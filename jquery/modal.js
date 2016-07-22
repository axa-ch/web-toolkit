/* global document */

import $ from 'jquery'

class Modal {

  constructor(element) {
    this.$element = $(element)
  }

  toggle() {
    if (this.$element.hasClass('is-active')) {
      this.$element.removeClass('is-active')
      $('body').removeClass('is-modal-open')
    } else {
      this.$element.addClass('is-active')
      $('body').addClass('is-modal-open')
    }
  }
}

// Plugin definition
function Plugin(option) {
  this.each(function () {
    const $this = $(this)
    let data = $this.data('axa.modal')

    if (!data) {
      data = new Modal(this)
      $this.data('axa.modal', data)
    }

    if (typeof option === 'string') {
      data[option]()
    }
  })
}

// Plugin registration
$.fn.modal = Plugin
$.fn.modal.Constructor = Modal

// DATA-API
$(document).on('click.axa.modal.data-api', '[data-modal]', function (e) {
  e.preventDefault()

  const $target = $($(e.currentTarget).data('modal'))
  Plugin.call($target, 'toggle')
})

//! Copyright AXA Versicherungen AG 2015
