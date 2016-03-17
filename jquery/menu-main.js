import $ from 'jquery'
import Bacon from 'baconjs'

class MainMenu {
  constructor(element) {
    this.$element = $(element)
    this.$items = this.$element.find('[data-item]')
    this.$links = this.$element.find('[data-link]')
    this.$panels = this.$element.find('[data-panel]')
    this.init()
  }

  init() {
    let currentlyOpen = Bacon.$.asEventStream.call(this.$items, 'mouseenter')
      .merge(Bacon.$.asEventStream.call(this.$items, 'mouseleave'))
      .throttle(100)
      .map((e) => {
        return {
          type: e.type,
          $e: $(e.currentTarget)
        }
      })
      .scan(null, (open, event) => {
        if (event.type == 'mouseenter' || event.type == 'mouseover')
          return event.$e
        if (event.type == 'mouseleave')
          return null
      })

    currentlyOpen.onValue((open) => {
      this.open(open)
    })
  }

  open($itemOrNull) {
    let $item = $()

    if ($itemOrNull) {
      $item = this.$items.filter($itemOrNull)
      if (!$item) throw new Error('please provide either a link, a panel or null')
    }

    this.$items.each((i, e) => {
      let $e = $(e)
      let toggleClass = $e.is($item)

      $e.find('[data-panel]').toggleClass('is-open', toggleClass)
    })
  }
}

function Plugin() {
  let params = arguments

  return this.each(function () {
    let $this = $(this)
    let data = $this.data('aem.menu')

    if (!data) {
      data = new MainMenu(this)
      $this.data('aem.menu', data)
    }
  })
}

$.fn.mainMenu = Plugin
$.fn.mainMenu.Constructor = MainMenu

$(function () {
  $('[data-menu="main"]').each(function () {
    let $menu = $(this)
    Plugin.call($menu)
  })
})

// Copyright AXA Versicherungen AG 2016
