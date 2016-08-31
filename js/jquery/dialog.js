import $ from 'jquery'
import registerPlugin from './register-plugin'
import Modal2 from './modal2'
import icon from './icon'

class Dialog {
  static DEFAULTS = {
    classes: {
      dialog: 'dialog',
      header: 'dialog__header',
      close: 'dialog__close',
      icon: 'dialog__close__icon',
      content: 'dialog__content',
      footer: 'dialog__footer',
    },
  }

  constructor(element, options) {
    this.$element = $(element)
    this.options = options

    this.init()
  }

  init() {
    const classes = this.options.classes
    const dialog = this.options[''] || this.options.html ||
      `<div class="${classes.dialog}">
        <div class="${classes.header}">
          <h1>${this.options.heading}</h1>
          
          <div class="${classes.close}">
            ${icon(this.options.iconClose, classes.icon)}
          </div>
        </div>
        <div class="${classes.content}">
          ${this.options.content}
        </div>
        <div class="${classes.footer}">
        </div>
      </div>`

    this.dialog = $(dialog)
  }

  bind() {

  }

  unbind() {

  }

  open() {
    this.$element.modal2({
      closeEnabled: false,
      html: this.dialog,
    })
  }

  close() {
    this.$element.modal2('close')
  }
}

registerPlugin('dialog', Dialog)
