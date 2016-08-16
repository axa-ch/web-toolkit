import $ from 'jquery'

/**
 * jQuery Plugin boilerplate glue code for plugin registration and instantiation.
 * This module is intended to streamline AXA's jQuery plugin development and to reduce boilerplate code.
 *
 * **Supported features:**
 * - Plugin registration
 * - Automatic Plugin instantiation through `data-pluginName` attributes
 * - Handling of Plugin defaults
 * - Instance-specific options through `data-pluginName-optionName` attributes or options hash
 * - Multiple Instatiation Guard
 *
 * @param {string} name - The unique `name` of the jQuery plugin.
 * @param {Class|Function} Constructor - The concrete implementation of your jQuery plugin.
 * @param {Object} [defaults={}] - Default options available/needed by your jQuery plugin.
 * @function
 */
function Plugin(name, Constructor, defaults: {}) {
  // functional API to set defaults globally
  $[name] = PluginWrapper
  // register plugin
  $.fn[name] = PluginWrapper
  // property based API to set defaults globally
  $.fn[name].defaults = defaults
  $.fn[name].Constructor = Constructor

  $(domReady)

  /**
   *
   * @param {Object|string} options
   * @param {any...} [rest]
   * @returns {*}
   * @constructor
     */
  function PluginWrapper(options, ...rest) {
    // set defaults globally if the plugin isn't instantiated
    if (!(this instanceof $)) {
      return $.extend(defaults, options)
    }

    let returns

    this.each(function () {
      const $this = $(this)
      const namespace = `axa.${name}`
      let instance = $this.data(namespace)

      // make sure instantiate no more than once
      if (!instance) {
        instance = new Constructor(this, {
          ...defaults,
          ...options,
        })
        $this.data(namespace, instance)
      }

      // If the first parameter is a string and
      // it is available as a method of the plugin,
      // treat this as a call to a public method.
      if (typeof options === 'string'
        && options in instance
        && typeof instance[options] === 'function') {
        // Call the method of our plugin instance,
        // and pass it the supplied arguments.
        returns = instance[options].apply(instance, rest)
      }
    })

    // If the earlier cached method
    // gives a value back return the value,
    // otherwise return this to preserve chainability.
    return returns !== void 0 ? returns : this
  }

  function domReady() {
    $(`[data-${name}]`).each(function () {
      const $this = $(this)
      const options = $this.data()

      PluginWrapper.call($this, options)
    })
  }
}

export default Plugin
