import $ from 'jquery'

function Plugin(name, Constructor, defaults: {}) {
  $[name] = Wrapper
  $.fn[name] = Wrapper
  $.fn[name].defaults = defaults
  $.fn[name].Constructor = Constructor

  $(domReady)

  function Wrapper(options) {
    if (!(this instanceof $)) {
      $.extend(defaults, options)
    }

    return this.each(function () {
      const $this = $(this)
      const namespace = `axa.${name}`
      let instance = $this.data(namespace)

      if (!instance) {
        instance = new Constructor(this, {
          ...defaults,
          ...options,
        })
        $this.data(namespace, instance)
      }

      if (typeof options === 'string'
        && options in instance
        && typeof instance[options] === 'function') {
        instance[options]()
      }
    })
  }

  function domReady() {
    $(`[data-${name}]`).each(function () {
      const $this = $(this)
      const options = $this.data()

      Wrapper.call($this, options)
    })
  }
}

export default Plugin
