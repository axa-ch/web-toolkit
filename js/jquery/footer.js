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
      this.$element.addClass('slide-from-left')
      this.$element.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        () => {
          $('.footer-back').removeClass('is-visible')
          $('.footer-social-top-container').removeClass('slide-from-right')
          $('.footer-social-top-container').show()
          $('.footer-links').removeClass('slide-from-right')
          this.$parents.show()
          this.$element.removeClass('is-active')
        }
      )
    } else {
      $('.footer-social-top-container').hide()
      $('.footer-back').addClass('is-visible')
      this.$element.addClass('is-active')
      this.$parents.hide()
      this.$element.removeClass('slide-from-left')
      $('.footer-social-top-container').addClass('slide-from-right')
      $('.footer-links').addClass('slide-from-right')
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
