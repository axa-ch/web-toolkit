import $ from 'jquery'

const NAME = 'search'
const VERSION = '1.0.0-alpha.2'
const DATA_KEY = 'axa.search'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Selector = {
  SEARCH: '[data-search="header"]',
  INPUT: '.header-search-input',
}

const Event = {
  OPEN: `open${EVENT_KEY}`,
  CLOSE: `close${EVENT_KEY}`,
  SUBMIT_DATA_API: `submit${EVENT_KEY}${DATA_API_KEY}`,
  BLUR_DATA_API: `blur${EVENT_KEY}${DATA_API_KEY}`,
  KEYUP_DATA_API: `keyup${EVENT_KEY}${DATA_API_KEY}`,
}

const ClassName = {
  IN: 'is-open',
}

class Search {
  constructor(element) {
    this._element = element
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
    $(this._element).addClass(ClassName.IN)
  }

  _close() {
    $(this._element).removeClass(ClassName.IN)
  }

  static _jQueryInterface(config) {
    return this.each(function () {
      let $element = $(this)
      let data = $element.data(DATA_KEY)

      if (!data) {
        data = new Search(this)
        $element.data(DATA_KEY, data)
      }

      if (config === 'open' || config === 'close') {
        data[config](this)
      }
    })
  }
}

$(document)
  .on(Event.SUBMIT_DATA_API, Selector.SEARCH, (event) => {
    let search = event.target
    let isOpen = $(search).hasClass(ClassName.IN)

    if (!isOpen) {
      event.preventDefault()
      Search._jQueryInterface.call($(search), 'open')
      $(search).find(Selector.INPUT).focus()
      return false
    }
  })
  .on(Event.BLUR_DATA_API, Selector.INPUT, (event) => {
    let search = $(event.target).closest(Selector.SEARCH)[0]
    Search._jQueryInterface.call($(search), 'close')
  })
  .on(Event.KEYUP_DATA_API, Selector.INPUT, (event) => {
    if (event.keyCode === 27) {
      $(event.target).blur()
    }
  })

$.fn[NAME] = Search._jQueryInterface
$.fn[NAME].Constructor = Search
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Search._jQueryInterface
}

export default Search
