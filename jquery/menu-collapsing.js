/* global window */

import $ from 'jquery'
import registerPlugin from './register-plugin'

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
registerPlugin('collapsingMenu', CollapsingMenu, (PluginWrapper) => {
  $('[data-menu="collapsing"]').each(function () {
    const $menu = $(this)
    const data = $menu.data()

    PluginWrapper.call($menu, data)
  })
})

//! Copyright AXA Versicherungen AG 2015
