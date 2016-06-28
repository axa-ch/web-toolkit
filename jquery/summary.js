import $ from 'jquery'

class Summary {

  constructor(element, options) {
    this.$element = $(element)

    this.defaults = {}

    this.options = $.extend({}, this.defaults, options)

    this.init()
  }

  init() {

    const firstY = this.$element.find('h3').first().offset().top - 14;
    const lastY = this.$element.find('h3').last().offset().top - 14;

    this.$element.append(`<style>.summary--magic:before{ top: ${firstY}px; height: ${(lastY-firstY)}px; }</style>`);

    /*`
    <svg class="icons-list__icon icon">
      <use xlink:href="/images/icons.svg#add"></use>
    </svg>
    */
  }

}

function Plugin() {
  const params = arguments

  return this.each(function () {
    const $this = $(this)
    let data = $this.data('axa.summary')

    if (!data) {
      data = new Summary(this)
      $this.data('axa.summary', data)
    }

    let method = params[0]
    if (typeof(method) === 'string') {
      data[method](...params.slice(1))
    }
  })
}

$.fn.summary = Plugin
$.fn.summary.Constructor = Summary

$(function () {
  $('[data-summary]').each(function () {
    const $summary = $(this)
    const data = $summary.data()
    Plugin.call($summary, data)
  })
})

// Copyright AXA Versicherungen AG 2015
