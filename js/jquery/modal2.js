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
    closeEnabled: true,
    closePosition: 'inside',
    classes: {
      body: 'modal2-is-open',
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
    this.element = element
    this.options = options
    this.$html = $(document.documentElement)
    this.$body = $(document.body)

    this.init()
    this.isOpen = false
  }

  init() {
    this.close = this.close.bind(this)

    const classes = this.options.classes

    this.$modal = $(`<div class="${classes.modal}">`)
    this.$backdrop = append(`<div class="${classes.backdrop}">`, this.$modal)
    this.$content = append(`<div class="${classes.content}">`, this.$backdrop)

    if (this.options.closeEnabled) {
      this.$close = append(`<button
          type="button"
          class="${classes.close} ${classes.close}--${this.options.closePosition}"
          data-modal2-close>
            ${icon(this.options.iconClose)}
        </button>`, this.$content)
    }
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
    const closeClickStream = this.$modal.find('[data-modal2-close]').asEventStream('click.axa.modal2')

    let closeStream = closeClickStream.merge(escapeStream)

    if (this.options.backdropClose) {
      const backdropStream = this.$backdrop.asEventStream('click.axa.modal2')
        .filter((e) => !$.contains(this.$backdrop[0], e.target))

      closeStream = closeStream.merge(backdropStream)
    }

    this.disposeClose = closeStream.doAction('.preventDefault')
      .onValue(this.close)
  }

  unbind() {
    this.disposeClose()
  }

  open() {
    if (this.isOpen) return
    this.isOpen = true

    this.$body.addClass(options.classes.body)
    const preventDefault = this.options.onBeforeOpen(this, insert.bind(this))

    if (preventDefault === false) {
      return
    }

    const href = this.element.href || this.options.href

    if (href) {
      this.load(href, insert.bind(this))
    } else {
      insert.call(this, $(this.options['']).clone())
    }

    function insert(html) {
      if (html) {
        this.$content.append(html)
      }

      this.$html.append(this.$modal)
      this.bind()

      this.options.onAfterOpen(this)
    }
  }

  load(url, callback) {
    $.ajax({
      url,
      success: (response) => {
        let $html = $(response)

        if (this.options.selector) {
          $html = $html.find(this.options.selector)
        }

        if ($html.length) {
          callback($html)
        } else {
          this.close()
        }
      },
      error: this.close,
    })
  }

  close() {
    if (!this.isOpen) return
    this.isOpen = false

    this.options.onBeforeClose(this)

    this.unbind()

    this.$modal.remove()
    this.$body.removeClass(options.classes.body)

    this.options.onAfterClose(this)
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
