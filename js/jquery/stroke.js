import $ from 'jquery'

const NAME = 'stroke'
const VERSION = '1.0.0-alpha.2'
const DATA_KEY = 'axa.stroke'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Selector = {
  STROKE: '[data-spy="stroke"]',
  NAV: '.nav',
  NAV_ITEM: '.nav-item',
}

const Event = {
  MOVE: `move${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
  HIDE: `hide${EVENT_KEY}`,
  NAV_MOUSEOVER: 'mouseover',
  NAV_MOUSEOUT: 'mouseout',
}

const ClassName = {
  IN: 'is-visible',
}

class Stroke {
  constructor(element) {
    this._element = element
  }

  move({ left, width }) {
    let customEvent = this._triggerMoveEvent({ left, width })
    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._move({ left, width })
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

  _triggerMoveEvent({ left, width }) {
    let moveEvent = $.Event(Event.MOVE, { left, width })
    $(this._element).trigger(moveEvent)
    return moveEvent
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

  _move({ left, width }) {
    this._element.setAttribute('style', [
      `width: ${width}px`,
      `-webkit-transform: translate(${left}px, 0)`,
      `-ms-transform: translate(${left}px, 0)`,
      `transform: translate(${left}px, 0)`,
      `-webkit-transform: translate3d(${left}px, 0, 0)`,
      `-ms-transform: translate3d(${left}px, 0, 0)`,
      `transform: translate3d(${left}px, 0, 0)`,
    ].join(';'))
  }

  _show() {
    $(this._element).addClass(ClassName.IN)
  }

  _hide() {
    $(this._element).removeClass(ClassName.IN)
  }

  static _jQueryInterface(config, ...args) {
    return this.each(function () {
      let $element = $(this)
      let data = $element.data(DATA_KEY)

      if (!data) {
        data = new Stroke(this)
        $element.data(DATA_KEY, data)
      }

      if (config === 'move' || config === 'show' || config === 'hide') {
        data[config](...args)
      }
    })
  }
}

$(document)
  .on(Event.NAV_MOUSEOVER, Selector.NAV, (event) => {
    let item = $(event.target).closest(Selector.NAV_ITEM)[0]
    let nav = $(item).closest(Selector.NAV)[0]

    let $stroke = $(Selector.STROKE).filter((i, element) => {
      let target = $(element).data('target')
      let match = $(nav).is(target)
      return match
    })

    Stroke._jQueryInterface.call($stroke, 'show')
    Stroke._jQueryInterface.call($stroke, 'move', {
      left: item ? item.offsetLeft : 0,
      width: item ? item.offsetWidth : 0,
    })
  })
  .on(Event.NAV_MOUSEOUT, Selector.NAV, (event) => {
    let item = $(event.target).closest(Selector.NAV_ITEM)[0]
    let nav = $(item).closest(Selector.NAV)[0]

    let $stroke = $(Selector.STROKE).filter((i, element) => {
      let target = $(element).data('target')
      let match = $(nav).is(target)
      return match
    })

    Stroke._jQueryInterface.call($stroke, 'hide')
  })

$.fn[NAME] = Stroke._jQueryInterface
$.fn[NAME].Constructor = Stroke
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Stroke._jQueryInterface
}

export default Stroke
