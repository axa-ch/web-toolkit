/* global window, document */

import $ from 'jquery'
import 'baconjs'
import registerPlugin from './register-plugin'
import append from './append'
import icon from './icon'
import './html5data'

const noop = () => {}

class Modal2 {
  static DEFAULTS = {
    backdropClose: true,
    classes: {
      modal: 'modal2',
      backdrop: 'modal2__backdrop',
      content: 'modal2__content',
      close: 'modal2__close',
    },
    onBeforeOpen: noop,
    onAfterOpen: noop,
    onBeforeClose: noop,
    onAfterClose: noop,
    selector: '',
  }

  constructor(element, options) {
    this.options = options
    this.$html = $(document.documentElement)
    this.$body = $(document.body)

    this.init()
    this.isOpen = false
  }

  init() {
    this.close = this.close.bind(this)

    const classes = this.options.classes

    this.$element = $(`<div class="${classes.modal}">`)
    this.$backdrop = append(`<div class="${classes.backdrop}">`, this.$element)
    this.$content = append(`<div class="${classes.content}">`, this.$backdrop)
    this.$close = append(`<button type="button" class="${classes.close}">
        ${icon(this.options.iconClose)}
      </button>`, this.$content)
  }

  toggle(options) {
    if (!this.isOpen) {
      this.open()
    } else {
      this.close()
    }
  }

  bind() {
    const keyUpStream = $(document).asEventStream('keyup.axa.modal2')
    const escapeStream = keyUpStream.filter((e) => e.keyCode === 27)
    const closeClickStream = this.$close.asEventStream('click.axa.modal2')
    let closeStream = closeClickStream.merge(escapeStream)

    if (this.options.backdropClose) {
      const backdropStream = this.$backdrop.asEventStream('click.axa.modal2')
        .filter((e) => !$.contains(this.$backdrop[0], e.target))

      closeStream = closeStream.merge(backdropStream)
    }

    this.disposeClose = closeStream.doAction('.preventDefault')
      .onValue(this.close)

    this.isOpen = true
  }

  unbind() {
    this.disposeClose()
  }

  open() {
    this.$body.addClass('modal2-is-open')

    this.options.onOpen(this)

    this.$content.append($(this.options['']).clone())

    this.$html.append(this.$element)
    this.bind()
  }

  close() {
    this.options.onClose(this)

    this.unbind()

    this.$element.remove()
    this.$body.removeClass('modal2-is-open')

    this.isOpen = false
  }
}

registerPlugin('modal2', Modal2, {
  customInstantiationCB: (PluginWrapper) => {
    $(document).on('click.axa.modal2', '[data-modal2]', function (e) {
      e.preventDefault()

      const $this = $(this)
      const data = $this.html5data('modal2')

      PluginWrapper.call($this, data)
    })
  },
  afterInstantiationCB: (instance, options) => {
    instance.toggle(options)
  },
})
