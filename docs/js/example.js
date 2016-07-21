/* global window */

import $ from 'jquery'
import Bacon from 'baconjs'

// only one window size stream for all Example instances
const resizes = $(window)
  .asEventStream('resize')

class Example {
  constructor(el) {
    this.$el = $(el)
    this.init()
  }

  init() {
    const $el = this.$el

    this.$frame = $el.find('[data-example-iframe]')
    this.$mobile = $el.find('[data-example-mobile]')
    this.$tablet = $el.find('[data-example-tablet]')
    this.$desktop = $el.find('[data-example-desktop]')

    // store the availability of the viewports
    this.disableMobile = $el.attr('data-example-disable-mobile')
    this.disableTablet = $el.attr('data-example-disable-tablet')
    this.disableDesktop = $el.attr('data-example-disable-desktop')

    // we need both an initial resize and click
    const initialResize = Bacon.once($el.width())
    const initialClick = Bacon.once($el.width())
      .map(this.mapWidthToViewport)
      .map(this.mapToEnabledViewport(this.disableMobile, this.disableTablet, this.disableDesktop))

    // viewport that we explicitly switched to
    this.clickedTo = initialClick
      .merge(this.$mobile.asEventStream('click').map('mobile'))
      .merge(this.$tablet.asEventStream('click').map('tablet'))
      .merge(this.$desktop.asEventStream('click').map('desktop'))
      .skipDuplicates()
      .toProperty()

    // viewport that we sized our browser into
    this.resizedTo = resizes
      .map(() => $el.width())
      .merge(initialResize)
      .throttle(25)
      .map(this.mapWidthToViewport)
      .map(this.mapToEnabledViewport(this.disableMobile, this.disableTablet, this.disableDesktop))
      .skipDuplicates()
      .toProperty()

    // set viewport on resizing changes
    this.clickedTo
      .sampledBy(this.resizedTo, (resizedTo, clickedTo) => {
        const resizedToOrder = this.viewportToOrder(resizedTo)
        const clickedToOrder = this.viewportToOrder(clickedTo)

        if (clickedToOrder <= resizedToOrder) { return clickedTo }
        return resizedTo
      }
    )
      .onValue(viewport => {
        this.setMode(viewport)
        return this.setViewport(viewport)
      }
    )

    // set availability on resizing changes
    this.resizedTo
      .onValue(viewport => this.setModeAvailability(viewport))

    // set viewport on clicking changes
    return this.resizedTo
      .sampledBy(this.clickedTo, (clickedTo, resizedTo) => {
        const resizedToOrder = this.viewportToOrder(resizedTo)
        const clickedToOrder = this.viewportToOrder(clickedTo)

        if (clickedToOrder <= resizedToOrder) { return clickedTo }
        return resizedTo
      }
    )
      .onValue(viewport => {
        this.setMode(viewport)
        return this.setViewport(viewport)
      }
    )
  }

  mapWidthToViewport(width) {
    if (width < 768) { return 'mobile' }
    if (width < 980) { return 'tablet' }
    return 'desktop'
  }

  mapToEnabledViewport(disableMobile, disableTablet, disableDesktop) {
    return function (viewport) {
      if ((viewport === 'mobile' && !disableMobile) || (disableTablet && disableDesktop)) { return 'mobile' }
      if ((viewport === 'tablet' && !disableTablet) || disableDesktop) { return 'tablet' }
      return 'desktop'
    }
  }

  mapViewportToWidth(viewport) {
    if (viewport === 'mobile') { return '320px' }
    if (viewport === 'tablet') { return '768px' }
    return '100%'
  }

  viewportToOrder(viewport) {
    if (viewport === 'mobile') { return 0 }
    if (viewport === 'tablet') { return 1 }
    return 2
  }

  setViewport(viewport) {
    return this.$frame.css('max-width', this.mapViewportToWidth(viewport))
  }

  setMode(viewport) {
    this.$mobile.toggleClass('is-active', viewport === 'mobile')
    this.$tablet.toggleClass('is-active', viewport === 'tablet')
    return this.$desktop.toggleClass('is-active', viewport === 'desktop')
  }

  setModeAvailability(maxViewport) {
    const maxViewportOrder = this.viewportToOrder(maxViewport)

    this.$mobile.toggleClass('is-available', !this.disableMobile && maxViewportOrder >= 0)
    this.$tablet.toggleClass('is-available', !this.disableTablet && maxViewportOrder >= 1)
    return this.$desktop.toggleClass('is-available', !this.disableDesktop && maxViewportOrder >= 2)
  }
}

$(() =>
  $('[data-example]')
    .each((i, el) => new Example(el))
)

//! Copyright AXA Versicherungen AG 2015
