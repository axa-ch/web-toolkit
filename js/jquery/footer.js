/* global document */

import $ from 'jquery'
import registerPlugin from './register-plugin'

class Footer {
  constructor(element) {
    this.$element = $($(element).data('footer'))
    this.$backLabel = $(element).data('back-label')
    this.$parents = $('.footer-title-only')
  }

  toggle() {
    if (this.$element.hasClass('is-active')) {
      $('.footer-back').remove()
      this.$element.removeClass('is-active')
      $('.footer-social-top-container').show()
      this.$parents.show()
    } else {
      $('.footer-social-top-container').hide()
      console.log('THIS.$BACKLABEL ', this.$backLabel)
      // console.log('THIS.$ELEMENT', this.$element)
      this.$element.prepend(`<li
        class="footer-back footer-link-item hidden-sm-up"
        >
          <a class="footer-link " href="#" data-footer="${this.$element.selector}">
          <svg class="footer-back-icon" viewBox="0 0 24 24">
	           <path fill-rule="evenodd" clip-rule="evenodd" d="M5.39 1.478L6.86-.025l10.3 10.522.004-.004 1.467 1.497-.003.005.004.004-1.472 1.503-.004-.005L6.9 23.975 5.434 22.48 15.688 12" data-reactid="37"></path>
          </svg>
          ${this.$backLabel}
        </a></li>`)
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
