/* global document */

import $ from 'jquery'
import registerPlugin from './register-plugin'

class Footer {
  constructor(element) {
    this.$element = $($(element).data('footer'))
    this.$parents = $('.footer-title-only')
  }

  toggle() {
    if (this.$element.hasClass('is-active')) {
      $('.footer-social-container').show()
      this.$element.removeClass('is-active')
      this.$parents.show()
    } else {
      $('.footer-social-container').hide()
      this.$element.addClass('is-active')
      this.$parents.hide()
    }
  }
}

registerPlugin('footer', Footer, (PluginWrapper) => {
  $(document).on('click', '[data-footer]', (e) => {
    e.preventDefault()
    const $target = $(e.currentTarget)
    PluginWrapper.call($target, 'toggle')
  })
})
