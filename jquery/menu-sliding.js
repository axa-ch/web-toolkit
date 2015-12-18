import $ from 'jquery'

class SlidingMenu {
  constructor(element) {
    this.$element = $(element)

    this.init()

    let $currentLevel = this.$element.find('.is-current')
    let $uppermostLevel = this.$element.children('[data-level]')

    this.level(($currentLevel.length > 0 ? $currentLevel : $uppermostLevel))

    $(window).on('resize', (e) => this.onWindowResize(e))
  }

  init() {
    this.$element.on('click', '[data-back]', this, (event) => {
      let link = $(event.target)
      let currentLevel = link.closest('[data-level]')
      let upperLevel = currentLevel.parent().closest('[data-level]')

      event.preventDefault()
      event.data.level(upperLevel)
    })

    this.$element.on('click', '[data-link]', this, (event) => {
      let link = $(event.target)
      let subLevel = link.siblings('[data-level]')

      if (subLevel.length > 0) {
        event.preventDefault()
        event.data.level(subLevel)
      }
    })
  }

  onWindowResize(e) {
    this.$element.css('height', this.level().outerHeight())
  }

  level(toSet) {
    if (!toSet) {
      return this.$element.find('.is-current')
    }

    this.$element.find('.is-current').removeClass('is-current')
    this.$element.find('.is-active').removeClass('is-active')
    this.$element.find('[data-level]').css('left', '')

    let lvl = this.$element.find(toSet)

    if (!lvl) {
      throw new Error('Provided level not in menu!')
    }

    this.$element.css('height', lvl.outerHeight())

    let parentLevels = lvl.parentsUntil(this.$element, '[data-level]')
    let parentLinks = lvl.parentsUntil(this.$element, '[data-link]')

    let left = -100 * parentLevels.length
    this.$element.children('[data-level]').css('left', `${left}%`)

    lvl.addClass('is-current')
    lvl.siblings('[data-link]').addClass('is-active')
    parentLinks.addClass('is-active')
  }
}

function Plugin() {
  let params = arguments

  return this.each(function () {
    let $this = $(this)
    let data = $this.data('axa.menu')

    if (!data) {
      data = new SlidingMenu(this)
      $this.data('axa.menu', data)
    }

    let method = params[0]
    if (typeof(method) === 'string') {
      let args = Array.prototype.slice.call(params, 1)
      data[method](...args)
    }
  })
}

$.fn.slidingMenu = Plugin
$.fn.slidingMenu.Constructor = SlidingMenu

$(function () {
  $('[data-menu="sliding"]').each(function () {
    let $menu = $(this)
    Plugin.call($menu)
  })
})

// Copyright AXA Versicherungen AG 2015
