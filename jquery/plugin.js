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
 *
 * @see {@link http://learn.jquery.com/plugins/basic-plugin-creation/|How to Create a Basic Plugin}
 * @see {@link http://learn.jquery.com/plugins/advanced-plugin-concepts/|Advanced Plugin Concepts}
 * @see {@link https://jqueryboilerplate.com/|jQuery Boilerplate}
 * @see {@link https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate|Extending jQuery Boilerplate}
 * @see {@link https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Handling-plugin-defaults-and-predefinitions|Handling plugin defaults and predefinitions}
 * @see {@link https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.highly-configurable.plugin.boilerplate.js|highly-configurable.plugin.boilerplate}
 * @see {@link https://github.com/jquery-boilerplate/jquery-boilerplate/blob/master/src/jquery.boilerplate.js|jquery.boilerplate.js}
 * @see {@link https://github.com/jquery-boilerplate/jquery-patterns|jQuery Plugin Patterns}
 *
 * @example <caption>Registering a custom jQuery plugin</caption>
 * // import the jQuery plugin boilerplate helper
 * import Plugin from './plugin'
 *
 * const defaults = {
 *  which: 'width'
 * }
 *
 * // your custom Plugin implementation
 * class LockDimensions {
 *  construction(element, options) {
 *    this.element = element
 *    this.options = options
 *
 *    this.$element = $(element)
 *    this.lock()
 *  }
 *
 *  lock() {
 *    if(!this.options.which || this.options.which === 'width')
 *      this.$element.width( this.$element.width() )
 *
 *    if(!this.options.which || this.options.which === 'height')
 *      this.$element.height( this.$element.height() )
 *  }
 *
 *  unlock() {
 *    if(!this.options.which || this.options.which === 'width')
 *      this.$element.css('width', '')
 *
 *    if(!this.options.which || this.options.which === 'height')
 *      this.$element.css('height', '')
 *  }
 * }
 *
 * // register your custom Plugin
 * Plugin('lockDimension', LockDimensions, defaults)
 *
 * @example <caption>Override global defaults</caption>
 * $.fn.lockDimension.defaults.which = false
 *
 * @example <caption>Override global defaults - nicer API</caption>
 * $.lockDimension({
 *  which: false
 * })
 *
 * @example <caption>Calling a method of the plugin</caption>
 * var locked = $('#lock-me').lockDimension()
 *
 * // call public method
 * locked.lockDimension('unlock')
 */
function Plugin(name, Constructor, defaults: {}) {
  // functional API to set defaults globally
  $[name] = PluginWrapper
  // register plugin
  $.fn[name] = PluginWrapper
  // property based API to set defaults globally
  $.fn[name].defaults = defaults
  $.fn[name].Constructor = Constructor

  // listen for DOM-Ready event
  $(domReady)

  /**
   * A really lightweight plugin wrapper around the constructor,
   * preventing against multiple instantiations and allowing any
   * public method to be called via the jQuery plugin,
   * e.g. `$(element).defaultPluginName('functionName', arg1, arg2)`
   *
   * @param {Object|string} options - Either plugin's options or if of type `string` a method to call.
   * @param {any...} [rest] - Any additional arguments passed to public method call if `options` is of type `string`.
   * @returns {*} - Returns the jQuery collection itself for chainability or a value if public method returns something.
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

      // make sure to instantiate no more than once
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

  // Automatically instantiate the associated jQuery Plugin
  // through searching for HTML5 data attributes with the
  // following naming convention:
  // `<tagname data-pluginname data-pluginname-option="value" />`
  function domReady() {
    $(`[data-${dasherize(name)}]`).each(function () {
      const $this = $(this)
      const options = $this.data()

      PluginWrapper.call($this, options)
    })
  }

  function dasherize(string) {
    return string.replace(/[A-Z]/g, (char, index) => {
      return (index !== 0 ? '-' : '') + char.toLowerCase()
    })
  }
}

export default Plugin
