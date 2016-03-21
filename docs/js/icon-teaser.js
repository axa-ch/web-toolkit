import $ from 'jquery'
import Bacon from 'baconjs'

require('slick-carousel')

class IconTeaser {
  constructor(element, options) {
    this.$element = $(element)
    this.$container = this.$element.find('[data-icon-teaser-container]')
    this.$toggles = this.$element.find('[data-icon-teaser-toggle]')
    this.$panels = this.$element.find('[data-icon-teaser-panel]')
    this.init()
  }

  init() {
    this.$container.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: true,
      speed: 300,
      touchThreshold: 10,
      easing: 'swing',
      slide: '[data-icon-teaser-panel]',
      customPaging: (slider, i) => {
        var label = this.$panels.eq(i).data('title')
        return '<a class="icon-teaser__link" data-role="none" role="button" aria-required="false" href="#">' + label + '</a>';
      },
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 979,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    })

    this.$toggles.on('click', (event) => {
      event.preventDefault()

      let name = $(event.target).data('icon-teaser-toggle')
      this.$container.slick('slickGoTo', name-1);
    })
  }
}

let Plugin = function () {
  return this.each(function () {
    let $this = $(this)
    let data = $this.data('axa.iconTeaser')

    if (!data) {
      data = new IconTeaser(this)
      $this.data('axa.iconTeaser', data)
    }
  })
}

$.fn.iconTeaser = Plugin
$.fn.iconTeaser.Constructor = IconTeaser

$(function () {
  $('[data-icon-teaser]').each(function () {
    let $iconTeaser = $(this)
    Plugin.call($iconTeaser)
  })
})
