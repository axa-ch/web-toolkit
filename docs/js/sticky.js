import $ from 'jquery'

class Sticky {
  constructor(element, options) {
    this.$element = $(element)
    this.init()
    this.offsetTop = this.$element.offset().top
  }

  init() {
    const $window = $(window)
    let scrollPos = 0

    $window
      .on('scroll.sticky', function () {
        // reset of less than offset top
        if ($window.scrollTop() < this.offsetTop) {
          this.$element.removeClass('is-sticky is-revealed is-hidden')
          scrollPos = $window.scrollTop()
          return
        }

        // add class sticky of scrolled below offset + height
        if ($window.scrollTop() > (this.offsetTop + this.$element.height())) {
          this.$element.addClass('is-sticky')
        }

        // show/hide navigation
        if (scrollPos > $window.scrollTop()) {
          this.$element.addClass('is-revealed').removeClass('is-hidden')
        } else {
          if ($window.scrollTop() > (this.offsetTop + this.$element.height())) {
            this.$element.addClass('is-hidden')
          }
          this.$element.removeClass('is-revealed')
        }

        scrollPos = $window.scrollTop()
      }.bind(this))
      .on('resize.sticky', function () {
        this.offsetTop = this.$element.offset().top
      }.bind(this))
  }

}

const Plugin = function (options) {
  const params = arguments

  return this.each(function () {
    const $this = $(this)
    let data = $this.data('axa.sticky')

    if (!data) {
      data = new Sticky(this, options)
      $this.data('axa.sticky', data)
    }
  })
}

$.fn.sticky = Plugin
$.fn.sticky.Constructor = Sticky

$(function () {
  $('[data-sticky]').each(function () {
    const $sticky = $(this)
    const data = $sticky.data()
    Plugin.call($sticky, data)
  })
})

// Copyright AXA Versicherungen AG 2015
