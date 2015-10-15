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
      this.$links
        .asEventStream('mouseenter')
        .doAction(() => console.log('Hello World!', arguments))
        //.doAction(($e) => this.open($e))

      // !Modernizr.touchevents
    }

    open($linkOrPanel) {
      console.log(this, arguments)
      let $panel = retrievePanel.call(this, $linkOrPanel)
      if (!$panel) throw new Error('please provide either a link or panel')

      this.$panels.each((i, e) => {
        let $e = $(e)
        let toggleClass = $e.is($panel)

        $e.toggleClass('is-open', toggleClass)
      })
    }

    opened($linkOrPanel) {
      let $panel = retrievePanel.call(this, $linkOrPanel)
      if (!$panel) throw new Error('please provide either a link or panel')

      return $panel.hasClass('is-open')
    }
  }

  function retrievePanel($linkOrPanel) {
    if ($linkOrPanel.data('link')) {
      return $linkOrPanel.siblings('[data-panel]')
    } else if ($linkOrPanel.data('panel')) {
      return $linkOrPanel
    } else {
      return null
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
