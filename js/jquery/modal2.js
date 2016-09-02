/* global window, document */

import $ from 'jquery'
import 'baconjs'
import registerPlugin from './register-plugin'
import append from './append'
import icon from './icon'
import './html5data'

const noop = () => {}

const modalGuard = (modal) => {
  if (modalGuard.openModal && modalGuard.openModal !== modal) {
    modalGuard.openModal.close()
  }

  modalGuard.openModal = modal
}

const lastFocused = []

class Modal2 {
  static DEFAULTS = {
    backdropClose: true,
    closeAriaLabel: 'close',
    closeEnabled: true,
    closePosition: 'inside',
    classes: {
      body: 'modal2-is-open',
      modal: 'modal2',
      backdrop: 'modal2__backdrop',
      content: 'modal2__content',
      close: 'modal2__close',
      icon: 'modal2__close__icon',
      open: 'is-open',
    },
    escapeClose: true,
    hideMainScrollbar: true,
    mode: 'scroll',
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

    this.close = this.close.bind(this)
    this.restrictFocus = this.restrictFocus.bind(this)

    this.init()
    this.isOpen = false
  }

  init() {
    const classes = this.options.classes

    this.$modal = $(`<div class="${classes.modal} ${classes.modal}--${this.options.mode}" tabindex="0" aria-hidden="false">`)
    this.$backdrop = append(`<div class="${classes.backdrop}">`, this.$modal)
    this.$content = append(`<div class="${classes.content}">`, this.$backdrop)

    if (this.options.closeEnabled) {
      this.$close = append(`<button
          type="button"
          class="${classes.close} ${classes.close}--${this.options.closePosition}"
          data-modal2-close
          aria-label="${this.options.closeAriaLabel}">
            ${icon(this.options.iconClose, classes.icon)}
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
    this.unbind()

    const $document = $(document)
    const closeClickStream = this.$modal.asEventStream('click.axa.modal2', '[data-modal2-close]')

    let closeStream = closeClickStream

    if (this.options.escapeClose) {
      const keyUpStream = $document.asEventStream('keyup.axa.modal2')
      const escapeStream = keyUpStream.filter((e) => e.keyCode === 27)

      closeStream = closeStream.merge(escapeStream)
    }

    if (this.options.backdropClose) {
      const backdropStream = this.$backdrop.asEventStream('click.axa.modal2')
        .filter((e) => !$.contains(this.$backdrop[0], e.target))

      closeStream = closeStream.merge(backdropStream)
    }

    this.disposeClose = closeStream.doAction('.preventDefault')
      .onValue(this.close)

    const focusStream = $document.asEventStream('focusin.axa.modal2')

    this.disposeFocus = focusStream.onValue(this.restrictFocus)
  }

  unbind() {
    if (this.disposeClose) {
      this.disposeClose()
      delete this.disposeClose
    }

    if (this.disposeFocus) {
      this.disposeFocus()
      delete this.disposeFocus
    }
  }

  open() {
    if (this.isOpen) return
    this.isOpen = true

    lastFocused.push(document.activeElement)

    modalGuard(this)

    this.$body.attr('aria-hidden', true)

    if (this.options.hideMainScrollbar) {
      this.$body.addClass(this.options.classes.body)
    }

    const preventDefault = this.options.onBeforeOpen(this, insert.bind(this))

    if (preventDefault === false) {
      return
    }

    const href = this.element.href || this.options.href

    if (href) {
      this.load(href, insert.bind(this))
    } else {
      insert.call(this, this.options.html || $(this.options['']).clone())
    }

    function insert(html) {
      if (html) {
        this.$content.append(html)
      }

      this.$modal.addClass(this.options.classes.open)
      this.$html.append(this.$modal)
      this.$modal.focus()
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

  restrictFocus(event) {
    if (!$.contains(this.$modal[0], event.target)) {
      event.stopPropagation()
      this.$modal.focus()
    }
  }

  close() {
    if (!this.isOpen) return
    this.isOpen = false

    this.options.onBeforeClose(this)

    this.unbind()

    this.$modal.remove()

    this.$body.attr('aria-hidden', false)

    if (this.options.hideMainScrollbar) {
      this.$body.removeClass(this.options.classes.body)
    }

    this.$modal.removeClass(this.options.classes.open)

    this.$content.empty()

    if (this.options.closeEnabled) {
      this.$content.append(this.$close)
    }

    this.options.onAfterClose(this)

    lastFocused.pop().focus()
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

export default Modal2
