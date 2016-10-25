import $ from 'jquery'

const NAME = 'axaFade'
const VERSION = '1.0.0-alpha.2'
const DATA_KEY = 'axa.fade'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const Selector = {
  FADE_DRAWER: '[data-fade="drawer"]',
  FADE_SEARCH: '[data-fade="search"]',
  DRAWER: '[data-make="drawer"]',
  SEARCH: '[data-search="header"]',
}

const Event = {
  SHOW: `show${EVENT_KEY}`,
  HIDE: `hide${EVENT_KEY}`,
  OPEN_DRAWER: 'open.axa.drawer',
  CLOSE_DRAWER: 'close.axa.drawer',
  OPEN_SEARCH: 'open.axa.search',
  CLOSE_SEARCH: 'close.axa.search',
}

class Fade {
  constructor(element) {
    this._element = element
  }

  show() {
    let customEvent = this._triggerShowEvent()
    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._show()
  }

  hide() {
    let customEvent = this._triggerHideEvent()
    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._hide()
  }

  dispose() {
    $.removeData(this._element, DATA_KEY)
    this._element = null
  }

  _triggerShowEvent() {
    let showEvent = $.Event(Event.SHOW)
    $(this._element).trigger(showEvent)
    return showEvent
  }

  _triggerHideEvent() {
    let hideEvent = $.Event(Event.HIDE)
    $(this._element).trigger(hideEvent)
    return hideEvent
  }

  _show() {
    $(this._element).addClass($(this._element).data('in'))
    $(this._element).removeClass($(this._element).data('out'))
  }

  _hide() {
    $(this._element).addClass($(this._element).data('out'))
    $(this._element).removeClass($(this._element).data('in'))
  }

  static _jQueryInterface(config) {
    return this.each(function () {
      let $element = $(this)
      let data = $element.data(DATA_KEY)

      if (!data) {
        data = new Fade(this)
        $element.data(DATA_KEY, data)
      }

      if (config === 'show' || config === 'hide') {
        data[config](this)
      }
    })
  }
}

$(document)
  .on(Event.OPEN_DRAWER, Selector.DRAWER, (event) => {
    let drawer = event.target
    let $fade = $(Selector.FADE_DRAWER).filter((i, element) => {
      let target = $(element).data('target')
      let match = $(drawer).is(target)
      return match
    })

    Fade._jQueryInterface.call($fade, 'show')
  })
  .on(Event.CLOSE_DRAWER, Selector.DRAWER, (event) => {
    let drawer = event.target
    let $fade = $(Selector.FADE_DRAWER).filter((i, element) => {
      let target = $(element).data('target')
      let match = $(drawer).is(target)
      return match
    })

    Fade._jQueryInterface.call($fade, 'hide')
  })
  .on(Event.OPEN_SEARCH, Selector.SEARCH, (event) => {
    let search = event.target
    let $fade = $(Selector.FADE_SEARCH).filter((i, element) => {
      let target = $(element).data('target')
      let match = $(search).is(target)
      return match
    })

    Fade._jQueryInterface.call($fade, 'hide')
  })
  .on(Event.CLOSE_SEARCH, Selector.SEARCH, (event) => {
    let search = event.target
    let $fade = $(Selector.FADE_SEARCH).filter((i, element) => {
      let target = $(element).data('target')
      let match = $(search).is(target)
      return match
    })

    Fade._jQueryInterface.call($fade, 'show')
  })

$.fn[NAME] = Fade._jQueryInterface
$.fn[NAME].Constructor = Fade

export default Fade
