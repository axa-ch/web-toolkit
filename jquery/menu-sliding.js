/* global window */

import $ from 'jquery'

class SlidingMenu {
  constructor(element) {
    this.$element = $(element)

    this.init()

    const $currentLevel = this.$element.find('.is-current')
    const $uppermostLevel = this.$element.children('[data-level]')

    this.level(($currentLevel.length > 0 ? $currentLevel : $uppermostLevel))

    $(window).on('resize', (e) => this.onWindowResize(e))
  }

  init() {
    this.$element.on('click', '[data-back]', this, (event) => {
      const link = $(event.target)
      const currentLevel = link.closest('[data-level]')
      const upperLevel = currentLevel.parent().closest('[data-level]')

      event.preventDefault()
      event.data.level(upperLevel)
    })

    this.$element.on('click', '[data-link]', this, (event) => {
      const link = $(event.target)
      const subLevel = link.siblings('[data-level]')

      if (subLevel.length > 0) {
        event.preventDefault()
        event.data.level(subLevel)
      }
    })
  }

  onWindowResize() {
    this.$element.css('height', this.level().outerHeight())
  }

  level(toSet) {
    if (!toSet) {
      this.$element.find('.is-current')
    }

    this.$element.find('.is-current').removeClass('is-current')
    this.$element.find('[data-level]').css('left', '')

    const lvl = this.$element.find(toSet)

    if (!lvl) {
      throw new Error('Provided level not in menu!')
    }

    this.$element.css('height', lvl.outerHeight())

    const parentLevels = lvl.parentsUntil(this.$element, '[data-level]')
    // const parentLinks = lvl.parentsUntil(this.$element, '[data-link]')

    const left = -100 * parentLevels.length
    this.$element.children('[data-level]').css('left', `${left}%`)

    lvl.addClass('is-current')
  }
}

const Plugin = (method, args) => this.each(() => {
  const $this = $(this)
  let data = $this.data('axa.menu')

  if (!data) {
    data = new SlidingMenu(this)
    $this.data('axa.menu', data)
  }

  if (typeof(method) === 'string') {
    data[method](...args)
  }
})

$.fn.slidingMenu = Plugin
$.fn.slidingMenu.Constructor = SlidingMenu

$(() => {
  $('[data-menu="sliding"]').each(() => {
    const $menu = $(this)
    Plugin.call($menu)
  })
})

// Copyright AXA Versicherungen AG 2015
