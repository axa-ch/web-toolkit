import $ from 'jquery'

/**
 * jQuery Plugin boilerplate glue code for plugin registration and instantiation.
 * This module is intended to streamline AXA's jQuery plugin development and to reduce boilerplate code.
 *
 * **Supported features:**
 * - Plugin registration
 * - Automatic Plugin instantiation through `data-pluginName` attributes
 * - Handling of Plugin defaults
 * - Multiple Instatiation Guard
 *
 * @param {string} name - The unique `name` of the jQuery plugin.
 * @param {Class|Function} Constructor - The concrete implementation of your jQuery plugin.
 * @param {Object} [defaults={}] - Default options available/needed by your jQuery plugin.
 * @function
 */
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
