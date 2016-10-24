import $ from 'jquery'

const NAME = 'drawer'
const VERSION = '1.0.0-alpha.2'
const DATA_KEY = 'axa.drawer'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Selector = {
  DRAWER: '[data-make="drawer"]',
  MASK: '.mask',
  BURGER: '.header-burger',
}

const Event = {
  OPEN: `open${EVENT_KEY}`,
  CLOSE: `close${EVENT_KEY}`,
  LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
}

class Drawer {
  constructor(element) {
    this._element = element
    this._isOpen = false
  }

  toggle() {
    if (!this._isOpen) {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    let customEvent = this._triggerOpenEvent()
    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._open()
  }

  close() {
    let customEvent = this._triggerCloseEvent()
    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._close()
  }

  dispose() {
    $.removeData(this._element, DATA_KEY)
    this._element = null
  }

  _triggerOpenEvent() {
    let openEvent = $.Event(Event.OPEN)
    $(this._element).trigger(openEvent)
    return openEvent
  }

  _triggerCloseEvent() {
    let closeEvent = $.Event(Event.CLOSE)
    $(this._element).trigger(closeEvent)
    return closeEvent
  }

  _open() {
    this._isOpen = true
  }

  _close() {
    this._isOpen = false
  }

  static _jQueryInterface(config) {
    return this.each(function () {
      let $element = $(this)
      let data = $element.data(DATA_KEY)

      if (!data) {
        data = new Drawer(this)
        $element.data(DATA_KEY, data)
      }

      if (config === 'toggle' || config === 'open' || config === 'close') {
        data[config](this)
      }
    })
  }
}

$(document)
  .on(Event.LOAD_DATA_API, Selector.DRAWER, (event) => {
    Drawer._jQueryInterface.call($(event.target), 'hide')
  })
  .on(Event.CLICK_DATA_API, Selector.MASK, (event) => {
    event.preventDefault()
    let drawer = $(event.target).closest(Selector.DRAWER)[0]
    Drawer._jQueryInterface.call($(drawer), 'toggle')
  })
  .on(Event.CLICK_DATA_API, Selector.BURGER, (event) => {
    event.preventDefault()
    let drawer = $(event.target).closest(Selector.DRAWER)[0]
    Drawer._jQueryInterface.call($(drawer), 'toggle')
  })

$.fn[NAME] = Drawer._jQueryInterface
$.fn[NAME].Constructor = Drawer
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Drawer._jQueryInterface
}

export default Drawer
