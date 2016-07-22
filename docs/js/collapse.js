/* global window */

import $ from 'jquery'
import Bacon from 'baconjs'

class Collapse {
  constructor(element, options) {
    this.$element = $(element)
    this.$triggers = this.$element.find('[data-trigger]')
    this.$panels = this.$element.find('[data-panel]')
    this.$panels.css('display', 'none').removeClass('is-hidden')
    this.options = $.extend({}, { single: false, open: '', speed: 250 }, options)
    this.options.open = this.options.open.split(' ')
    this.init()
  }

  init() {
    const clicks = Bacon.$.asEventStream.call(this.$triggers, 'click')
      .doAction('.preventDefault')
      .map((event) => this.mapEventToCommand(event))

    clicks.onValue((event) => this.toggleTrigger(event))
    clicks.onValue((event) => this.togglePanel(event))

    for (const o of this.options.open) {
      const e = {
        target: o,
      }

      this.toggleTrigger(e)
      this.togglePanel(e)
    }
  }

  mapEventToCommand(event) {
    const $e = $(event.target)

    return {
      target: $e.data('trigger'),
    }
  }

  scanCommands(opened, command) {
    if (command.type === 'close') {
      opened = opened.filter((target) => target !== command.target)
    }

    if (command.type === 'open') {
      if (this.options.single) opened = [command.target]
      if (opened.indexOf(command.target) < 0) opened.push(command.target)
    }
    return opened
  }

  toggleTrigger(event) {
    const triggers = this.$triggers.filter((index, e) => $(e).data('trigger') === event.target)

    triggers.each((i, e) => {
      $(e).toggleClass('is-active')
    })
  }

  togglePanel(event) {
    const panel = this.$panels.filter((index, e) => e.dataset.panel === event.target)
    const $panel = $(panel)

    if (!$panel.hasClass('is-open')) {
      $panel.slideDown(this.options.speed).addClass('is-open')
    } else {
      $panel.slideUp(this.options.speed).removeClass('is-open')
    }
  }
}

function Plugin(options) {
  this.each(() => {
    const $this = $(this)
    let data = $this.data('axa.collapse')

    if (!data) {
      data = new Collapse(this, options)
      $this.data('axa.collapse', data)
    }
  })
}

$.fn.collapse = Plugin
$.fn.collapse.Constructor = Collapse

$(window).on('load', () => {
  $('[data-collapse]').each(function () {
    const $collapse = $(this)
    const data = $collapse.data()
    Plugin.call($collapse, data)
  })
})

// Copyright AXA Versicherungen AG 2016
