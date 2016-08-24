/* global document */

import $ from 'jquery'
import registerPlugin from './register-plugin'

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
registerPlugin('modal', Modal, (PluginWrapper) => {
  $(document).on('click.axa.modal.data-api', '[data-modal]', function (e) {
    e.preventDefault()

    const $target = $($(e.currentTarget).data('modal'))
    PluginWrapper.call($target, 'toggle')
  })
})

//! Copyright AXA Versicherungen AG 2015
