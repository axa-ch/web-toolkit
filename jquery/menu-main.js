(function ($, Bacon, Modernizr) {
  class MainMenu {
    constructor(element) {
      this.$element = $(element)
      this.$items = this.$element.find('[data-item]')
      this.$links = this.$element.find('[data-link]')
      this.$panels = this.$element.find('[data-panel]')
      this.init()
    }

    init() {
      this.$items
        .asEventStream('mouseenter')
        .merge(this.$items.asEventStream('mouseleave'))
        .throttle(300)
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
        .onValue((open) => {
          console.log('open')
          this.open(open)
        })

      // !Modernizr.touchevents
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

    opened($linkOrPanel) {
      let $panel = retrievePanel.call(this, $linkOrPanel)
      if (!$panel) throw new Error('please provide either a link or panel')

      return $panel.hasClass('is-open')
    }
  }

  let Plugin = function () {
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

  $(window).on('load', function () {
    $('[data-menu="main"]').each(function () {
      let $menu = $(this)
      let data = $menu.data()
      Plugin.call($menu, data)
    })
  })

})(jQuery, Bacon, Modernizr)

// Copyright AXA Versicherungen AG 2015
