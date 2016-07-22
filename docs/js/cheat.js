import $ from 'jquery'
import cheet from 'cheet.js'

// this array maps keyboard sequences to to-be-opened elements
const elements = {}

class Cheat {
  constructor(element, options) {
    this.$element = $(element)

    const sequence = (options && options.sequence) || '↑ ↑ ↓ ↓ ← → ← → b a'

    if (!elements[sequence]) {
      elements[sequence] = $()
      cheet(sequence, () => {
        elements[sequence].each(function () {
          $(this).addClass('is-unlocked')
          $(this).css('max-height', `${$(this).height()}px`)
        })
      })
    }

    elements[sequence] = elements[sequence].add(this.$element)
  }
}

function Plugin(options) {
  const $element = $(this)
  let instance = $element.data('axa.cheat')

  if (!instance) {
    instance = new Cheat(this, options)
    $element.data('axa.cheat', instance)
  }
}

$.fn.cheat = Plugin
$.fn.cheat.Constructor = Cheat

$(() => {
  $('[data-cheat]').each(() => {
    const $element = $(this)
    const options = $element.data()

    Plugin.call($element, options)
  })
})

// Copyright AXA Versicherungen AG 2015
