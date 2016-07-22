/* global window */

import $ from 'jquery'

// Public class definition
class CollapsingMenu {
  static DEFAULTS = {
    exclusive: false,
  }

  constructor(element, options) {
    this.$element = $(element)
    this.options = {
      ...CollapsingMenu.DEFAULTS,
      ...options,
    }

    this.init()
  }

  init() {
    this.$element.on('click', '[data-link]', this, (event) => {
      const link = $(event.target)
      const subLevel = link.siblings('[data-level]')

      if (subLevel.length > 0) {
        event.preventDefault()
        event.data.toggle(subLevel)
      }
    })
  }

  toggle(toSet) {
    const level = this.$element.find(toSet)

    if (!level) { throw new Error('Provided level not in menu!') }

    // const parentLinks = level.parentsUntil(this.$element, '[data-link]')
    const parentLevels = level.parentsUntil(this.$element, '[data-level]')

    const shouldOpen = !level.hasClass('is-open')

    if (shouldOpen && this.options.exclusive) {
      this.$element.find('[data-level]')
        .not(parentLevels)
        .removeClass('is-open')
        .siblings('[data-link]')
        .removeClass('is-active')
    }

    level.toggleClass('is-open', shouldOpen)
      .siblings('[data-link]')
      .toggleClass('is-active', shouldOpen)
  }
}

// Plugin definition
const Plugin = (option, ...args) => this.each(() => {
  const $this = $(this)
  let data = $this.data('axa.menu')
  const options = $.extend({}, CollapsingMenu.DEFAULTS, data, typeof option === 'object' && option)

  if (!data) {
    data = new CollapsingMenu(this, options)
    $this.data('axa.menu', data)
  }

  if (typeof option === 'string' && option === 'toggle') {
    data.toggle(args[0])
  }

  return data
})

// Plugin registration
$.fn.collapsingMenu = Plugin
$.fn.collapsingMenu.Constructor = CollapsingMenu

// DATA-API
$(window).on('load', () =>
  $('[data-menu="collapsing"]').each(() => {
    const $menu = $(this)
    const data = $menu.data()

    return Plugin.call($menu, data)
  })
)

//! Copyright AXA Versicherungen AG 2015
