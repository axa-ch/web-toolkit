import $ from 'jquery'
import { iframeResizer } from 'iframe-resizer'

class IFrameResizer {
  constructor(el, options) {
    this.$el = $(el)

    iframeResizer({
      autoResize: true,
      resizeFrom: 'child',
      checkOrigin: false,
      sizeHeight: true,
      maxHeight: options.maxHeight || 'infinity',
      minHeight: options.minHeight || 0,
      heightCalculationMethod: 'lowestElement',
    }, this.$el[0])
  }
}

function Plugin(option) {
  const $el = $(this)
  let data = $el.data('axa.iframe-resizer')
  const options = typeof option === 'object' && option

  // there's no instance yet
  if (!data) {
    data = new IFrameResizer(this, options)
    $el.data('axa.iframe-resizer', data)
  }
}

$(() =>
  $('[data-iframe-resizer]').each(() => {
    const $el = $(this)
    const data = $el.data()

    return Plugin.call($el, data)
  })
)

//! Copyright AXA Versicherungen AG 2015
