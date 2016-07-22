/* global window */

import $ from 'jquery'

// Public class definition
class Dropzone {

  constructor(element, options) {
    this.element = element
    this.$element = $(element)
    this.options = {
      ...options,
    }

    this.init()
  }

  init() {
    this.$element.bind('dragover', this, (event) => {
      event.preventDefault()
      event.data.$element.addClass('dropzone__container--dragover')
    })

    this.$element.bind('dragleave', this, (event) => {
      event.preventDefault()
      event.data.$element.removeClass('dropzone__container--dragover')
    })

    return this.$element.on('drop', this, (event) => {
      event.preventDefault()
      event.data.$element.removeClass('dropzone__container--dragover')
    })
  }
}

// Plugin definition
const Plugin = () => this.each(() => {
  const $this = $(this)
  let data = $this.data('axa.dropzone')

  if (!data) {
    data = new Dropzone(this)
    $this.data('axa.dropzone', data)
  }

  return data
})

// Plugin registration
$.fn.dropzone = Plugin
$.fn.dropzone.Constructor = Dropzone

// DATA-API
$(window).on('load', () =>
  $('[data-dropzone="dropzone"]').each(() => {
    const $dropzone = $(this)
    Plugin.call($dropzone)
  })
)

//! Copyright AXA Versicherungen AG 2015
