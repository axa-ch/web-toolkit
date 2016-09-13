/* global document */

import $ from 'jquery'
import registerPlugin from './register-plugin'
import Modal2 from './modal2'
import icon from './icon'

/**
 * The Dialog takes the following list of optional options.
 *
 * **Note:**
 * All of those options can also be assigned through HTML `data-dialog-*` attributes.
 *
 * @typedef Dialog#Options
 * @type {Object}
 * @property {Object} classes - A hash of class names which are rendered by this plugin.
 * @property {string} [classes.dialog=dialog] - The modal2 block class.
 * @property {string} [classes.header=dialog__header] - The dialogs's backdrop element class.
 * @property {string} [classes.heading=dialog__heading] - The dialogs's content element class.
 * @property {string} [classes.close=dialog__close] - The dialogs's close element class.
 * @property {string} [classes.icon=dialog__close__icon] - The dialogs's close icon element class.
 * @property {string} [classes.content=dialog__content] - The dialogs's backdrop element class.
 * @property {string} [classes.footer=dialog__footer] - The dialogs's content element class.
 * @property {string} [closeAriaLabel=close] - ARIA label for close button.
 * @property {string} [position=middle] - A string specifying the dialogs vertical position - `'top'`, `'middle'` or `'bottom'`.
 */

/**
 * Dialog implements UI which is wrapped inside an Modal2 instance.
 *
 * @class
 * @requires jquery
 * @requires register-plugin
 * @requires icon
 */
class Dialog {
  static DEFAULTS = {
    classes: {
      dialog: 'dialog',
      header: 'dialog__header',
      heading: 'dialog__heading',
      close: 'dialog__close',
      icon: 'dialog__close__icon',
      content: 'dialog__content',
      footer: 'dialog__footer',
    },
    closeAriaLabel: 'close',
    position: 'middle',
  }

  constructor(element, options) {
    this.$element = $(element)
    this.options = options

    this.init()
    this.isOpen = false
  }

  init() {
    const classes = this.options.classes
    const dialog = this.options[''] || this.options.html ||
      `<div class="${classes.dialog} ${classes.dialog}--${this.options.position}" role="dialog" aria-labelledby="dialog__aria-label">
        <div class="${classes.header}">
          <h1 class="${classes.heading}" id="dialog__aria-label">${this.options.heading}</h1>
          
          <button class="${classes.close}" type="button" data-modal2-close aria-label="${this.options.closeAriaLabel}">
            ${icon(this.options.iconClose, classes.icon)}
          </button>
        </div>
        <div class="${classes.content}">
          ${this.options.content}
        </div>
        <div class="${classes.footer}">
        </div>
      </div>`

    this.dialog = $(dialog).clone()
  }

  bind() {

  }

  unbind() {

  }

  toggle() {
    if (!this.isOpen) {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    if (this.isOpen) return
    this.isOpen = true

    this.$element.modal2({
      ...this.options.modal,
      closeEnabled: false,
      html: this.dialog,
      mode: 'fullscreen',
      onBeforeClose: this.close.bind(this),
    })
  }

  close() {
    if (!this.isOpen) return
    this.isOpen = false
  }
}

registerPlugin('dialog', Dialog, {
  customInstantiationCB: (PluginWrapper) => {
    $(document).on('click.axa.dialog', '[data-dialog]', function (e) {
      e.preventDefault()

      const $this = $(this)
      const data = $this.html5data('dialog')

      PluginWrapper.call($this, data)
    })
  },
  afterInstantiationCB: (instance, options) => {
    instance.toggle(options)
  },
})
