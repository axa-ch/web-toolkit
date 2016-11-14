/* global window */

import $ from 'jquery'
import Bacon from 'baconjs'

// only one window size stream for all Example instances
const resizes = Bacon.$.asEventStream.call($(window), 'resize')

class Example {
  constructor(el) {
    this.$el = $(el)
    this.init()
  }

  init() {
    const $el = this.$el

    this.$frame = $el.find('[data-example-iframe]')
    this.$xs = $el.find('[data-example-xs]')
    this.$sm = $el.find('[data-example-sm]')
    this.$md = $el.find('[data-example-md]')
    this.$lg = $el.find('[data-example-lg]')

    // store the availability of the viewports
    this.disableXs = $el.attr('data-example-disable-xs')
    this.disableSm = $el.attr('data-example-disable-sm')
    this.disableMd = $el.attr('data-example-disable-md')
    this.disableLg = $el.attr('data-example-disable-lg')

    // we need both an initial resize and click
    const initialResize = Bacon.once($el.width())
    const initialClick = Bacon.once($el.width())
      .map(this.mapWidthToViewport)
      .map(this.mapToEnabledViewport(this.disableXs, this.disableSm, this.disableMd, this.disableLg))

    // viewport that we explicitly switched to
    this.clickedTo = initialClick
      .merge(Bacon.$.asEventStream.call(this.$xs, 'click').map('xs'))
      .merge(Bacon.$.asEventStream.call(this.$sm, 'click').map('sm'))
      .merge(Bacon.$.asEventStream.call(this.$md, 'click').map('md'))
      .merge(Bacon.$.asEventStream.call(this.$lg, 'click').map('lg'))
      .skipDuplicates()
      .toProperty()

    // viewport that we sized our browser into
    this.resizedTo = resizes
      .map(() => $el.width())
      .merge(initialResize)
      .throttle(25)
      .map(this.mapWidthToViewport)
      .map(this.mapToEnabledViewport(this.disableXs, this.disableSm, this.disableMd, this.disableLg))
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
      .onValue((viewport) => {
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
      .onValue((viewport) => {
        this.setMode(viewport)
        return this.setViewport(viewport)
      }
    )
  }

  mapWidthToViewport(width) {
    if (width < 768) { return 'xs' }
    if (width < 992) { return 'sm' }
    if (width < 1200) { return 'md' }
    return 'lg'
  }

  mapToEnabledViewport(disableXs, disableSm, disableMd, disableLg) {
    return function (viewport) {
      if ((viewport === 'xs' && !disableXs) || (disableSm && disableMd && disableLg)) { return 'xs' }
      if ((viewport === 'sm' && !disableSm) || (disableMd && disableLg)) { return 'sm' }
      if ((viewport === 'md' && !disableMd) || (disableLg)) { return 'md' }
      return 'lg'
    }
  }

  mapViewportToWidth(viewport) {
    if (viewport === 'xs') { return '360px' }
    if (viewport === 'sm') { return '768px' }
    if (viewport === 'md') { return '992px' }
    return '100%'
  }

  viewportToOrder(viewport) {
    if (viewport === 'xs') { return 0 }
    if (viewport === 'sm') { return 1 }
    if (viewport === 'md') { return 2 }
    return 3
  }

  setViewport(viewport) {
    return this.$frame.css('max-width', this.mapViewportToWidth(viewport))
  }

  setMode(viewport) {
    this.$xs.toggleClass('is-active', viewport === 'xs')
    this.$sm.toggleClass('is-active', viewport === 'sm')
    this.$md.toggleClass('is-active', viewport === 'md')
    return this.$lg.toggleClass('is-active', viewport === 'lg')
  }

  setModeAvailability(maxViewport) {
    const maxViewportOrder = this.viewportToOrder(maxViewport)

    this.$xs.toggleClass('is-available', !this.disableXs && maxViewportOrder >= 0)
    this.$sm.toggleClass('is-available', !this.disableSm && maxViewportOrder >= 1)
    this.$md.toggleClass('is-available', !this.disableMd && maxViewportOrder >= 2)
    return this.$lg.toggleClass('is-available', !this.disableLg && maxViewportOrder >= 3)
  }
}

$(() =>
  $('[data-example]').each((i, el) => new Example(el))
)
