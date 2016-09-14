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

/**
 * The Modal-2 takes the following list of optional options.
 *
 * **Note:**
 * All of those options can also be assigned through HTML `data-modal2-*` attributes.
 * Except `href` attribute is also considered for opening links in a modal manner.
 *
 * ```html
 * <a href="foo.html"
 *  data-modal2-autofocus="true"
 *  data-modal2-backdrop-close="true"
 *  data-modal2-close-aria-label="close"
 *  data-modal2-close-enabled="true"
 *  data-modal2-close-position="inside"
 *  data-modal2-classes="{
 *    body: 'modal2-is-open',
 *    modal: 'modal2',
 *    backdrop: 'modal2__backdrop',
 *    content: 'modal2__content',
 *    close: 'modal2__close',
 *    icon: 'modal2__close__icon',
 *    open: 'is-open'
 *  }"
 *  data-modal2-escape-close="true"
 *  data-modal2-hide-main-scroll-bar="true"
 *  data-modal2-mode="scroll"
 *  data-modal2-selector=".foo">
 * ```
 *
 * @typedef Modal2#Options
 * @type {Object}
 * @property {boolean} [autofocus=true] - Should the modal automtically be focused.
 * @property {boolean} [backdropClose=true] - Close the modal if it's backdrop is clicked.
 * @property {string} [closeAriaLabel=close] - ARIA label for close button.
 * @property {boolean} [closeEnabled=true] - Whether a close button is enabled or not.
 * @property {string} [closePosition=inside] - The position of the close button, currently `'inside'` or `'outside'`.
 * @property {Object} classes - A hash of class names which are rendered by this plugin.
 * @property {string} [classes.body=modal2-is-open] - A class which is appended to the body like `<body class="modal2-is-open"`> to hide scroll bars.
 * @property {string} [classes.modal=modal2] - The modal2 block class.
 * @property {string} [classes.backdrop=modal2__backdrop] - The modal2's backdrop element class.
 * @property {string} [classes.content=modal2__content] - The modal2's content element class.
 * @property {string} [classes.close=modal2__close] - The modal2's close element class.
 * @property {string} [classes.icon=modal2__close__icon] - The modal2's close icon element class.
 * @property {string} [classes.open=is-open] - The modal2's is-open state class.
 * @property {boolean} [escapeClose=true] - Closing the modal if `Esc` key is pressed.
 * @property {boolean} [hideMainScrollbar=true] - Hide the main scrollbar.
 * @property {string} [mode=scroll] - The overflow control mode of the model, either `'scroll'` which means handled by the model itself or `'fullscreen'` which means delegated to encapsulated content.
 * @property {Modal2~onBeforeOpen} [onBeforeOpen] - A callback before the modal opens.
 * @property {Modal2~onAfterOpen} [onAfterOpen] - A callback after the modal has been opened.
 * @property {Modal2~onBeforeClose} [onBeforeClose] - A callback before the modal closes.
 * @property {Modal2~onAfterClose} [onAfterClose] - A callback after the modal has been closed.
 * @property {string} [selector] - A CSS-Selector to feed the modal's content with just a portion of the supplied markup.
 */

/**
 * Modal2 implements an encapsulated modal layer with a backdrop.
 *
 * @class
 * @requires jquery
 * @requires baconjs
 * @requires register-plugin
 * @requires append
 * @requires icon
 * @requires html5data
 */
class Modal2 {
  /**
   * Modal2 default options.
   *
   * @type {Modal2#Options}
   */
  static DEFAULTS = {
    autofocus: true,
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

    this.$modal = $(`<div class="${classes.modal} ${classes.modal}--${this.options.mode}" aria-hidden="false">`)
    this.$backdrop = append(`<div class="${classes.backdrop}">`, this.$modal)
    this.$content = append(`<div class="${classes.content}" tabindex="0">`, this.$backdrop)

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

  toggle() {
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

      if (this.options.autofocus) {
        this.$content.focus()
      }

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

/**
 * Exports Modal2 Class.
 * 
 * @exports Modal2
 */
export default Modal2

/**
 * This callback triggers before the modal opens.
 * @callback Modal2~onBeforeOpen
 * @param {Modal2} - The current Modal2 instance.
 * @param {Function} - A function which inserts the passed HTML into the modal.
 * @returs {Boolean|*} - Return `false` to prevent the default content aquisition process.
 */

/**
 * This callback triggers after the modal has been opened.
 * @callback Modal2~onAfterOpen
 * @param {Modal2} - The current Modal2 instance.
 */

/**
 * This callback triggers before the modal closes.
 * @callback Modal2~onBeforeClose
 * @param {Modal2} - The current Modal2 instance.
 */

/**
 * This callback triggers after the modal has been closed.
 * @callback Modal2~onAfterClose
 * @param {Modal2} - The current Modal2 instance.
 */
