import $ from 'jquery'
import 'slick-carousel'
import Bacon from 'baconjs'
import registerPlugin from './register-plugin'
import resizeStream from './resize-stream'

class IconTeaser {
  constructor(element) {
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
        const label = this.$panels.eq(i).data('title')
        // @Todo: change to anchor as soon as https://github.com/kenwheeler/slick/issues/2468 is fixed
        return `<div class="icon-teaser__link" data-role="none" role="button" aria-required="false">${label}</div>`
      },
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 979,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
          },
        },
      ],
    })

    Bacon.once()
      .merge(resizeStream)
      .debounce(250)
      .onValue(() => {
        this.equalizeHeights()
      })

    this.$toggles.on('click', (event) => {
      event.preventDefault()

      const name = $(event.target).data('icon-teaser-toggle')
      this.$container.slick('slickGoTo', name - 1)
    })
  }

  equalizeHeights() {
    const $track = this.$element.find('.slick-track')
    const $slides = $track.children()

    $slides.css('min-height', '')
    $slides.css('min-height', $track.height())
  }
}

registerPlugin('iconTeaser', IconTeaser)
