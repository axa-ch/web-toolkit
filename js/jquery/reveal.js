/* eslint-disable no-underscore-dangle, no-plusplus, no-undef */

import $ from 'jquery'

const NAME = 'axaReveal'
const VERSION = '1.0.0-alpha.5'
const DATA_KEY = 'axa.reveal'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const Default = {
  offsetTop: 0,
}

const Selector = {
  DATA_REVEAL: '[data-spy="reveal"]',
}

const Event = {
  SCROLL: `scroll${EVENT_KEY}`,
  LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
}

const ClassName = {
  REVEAL: 'revealable',
  REVEALED: 'revealed',
  UNREVEALED: 'unrevealed',
}

class Reveal {
  constructor(element, config) {
    this._element = element
    this._config = $.extend({}, Default, config)
    this._lastPosition = 0

    $(window).on(Event.SCROLL, event => this._process(event))

    this._process()
  }

  static get VERSION() {
    return VERSION
  }

  static get Default() {
    return Default
  }

  reveal() {
    const customEvent = this._triggerRevealEvent()
    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._reveal()
  }

  unreveal() {
    const customEvent = this._triggerUnrevealEvent()
    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._unreveal()
  }

  dispose() {
    $.removeData(this._element, DATA_KEY)
    $(this._scrollElement).off(EVENT_KEY)

    this._element = null
    this._scrollElement = null
  }

  _triggerRevealEvent() {
    const revealEvent = $.Event(Event.REVEAL) // eslint-disable-line new-cap
    $(this._element).trigger(revealEvent)
    return revealEvent
  }

  _triggerUnrevealEvent() {
    const unrevealEvent = $.Event(Event.UNREVEAL) // eslint-disable-line new-cap
    $(this._element).trigger(unrevealEvent)
    return unrevealEvent
  }

  _reveal() {
    $(this._element).addClass(ClassName.REVEALED)
    $(this._element).removeClass(ClassName.UNREVEALED)
  }

  _unreveal() {
    $(this._element).addClass(ClassName.UNREVEALED)
    $(this._element).removeClass(ClassName.REVEALED)
  }

  _process() {
    const $element = $(this._element)

    if (window.scrollY < this._config.offsetTop) {
      $element.removeClass(`${ClassName.REVEAL} ${ClassName.REVEALED} ${ClassName.UNREVEALED}`)
      this._lastPosition = window.scrollY
      return
    }

    if (window.scrollY >= this._config.offsetTop) {
      $element.addClass(ClassName.REVEAL)
    }

    if (window.scrollY < this._lastPosition) {
      $element.addClass(ClassName.REVEALED).removeClass(ClassName.UNREVEALED)
    } else {
      if (window.scrollY >= this._config.offsetTop) {
        $element.addClass(ClassName.UNREVEALED)
      }

      $element.removeClass(ClassName.REVEALED)
    }

    this._lastPosition = window.scrollY
  }

  static _jQueryInterface(config) {
    return this.each((index, element) => {
      const $element = $(element)
      const _config = typeof config === 'object' ? config : null
      let data = $element.data(DATA_KEY)

      if (!data) {
        data = new Reveal(element, _config)
        $element.data(DATA_KEY, data)
      }

      if (typeof config === 'string') {
        if (data[config] === undefined) {
          throw new Error(`No method named "${config}"`)
        }
        data[config]()
      }
    })
  }
}

$(window)
  .on(Event.LOAD_DATA_API, () => {
    const reveals = $.makeArray($(Selector.DATA_REVEAL))

    for (let i = reveals.length; i--;) {
      const $reveal = $(reveals[i])
      Reveal._jQueryInterface.call($reveal, $reveal.data())
    }
  })

$.fn[NAME] = Reveal._jQueryInterface
$.fn[NAME].Constructor = Reveal

export default Reveal
