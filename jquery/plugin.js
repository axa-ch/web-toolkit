/**
 * Exporting Plugin function directly.
 * @module Plugin
 */

import $ from 'jquery'
import dasherize from './dasherize'
import './html5data'

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
 * @function Plugin
 * @param {string} name - The unique `name` of the jQuery plugin.
 * @param {Class|Function} Constructor - The concrete implementation of your jQuery plugin.
 * @param {customInstantiationCB} [customInstantiationCB] - A custom instantiation callback, use it e.g. if you need to delegate some custom events.
 * @requires jquery
 * @requires dasherize
 * @requires html5data
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
 * // your custom Plugin implementation
 * class LockDimensions {
 *  static DEFAULTS = {
 *    which: 'width',
 *  }
 *
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
 * Plugin('lockDimension', LockDimensions)
 *
 * @example <caption>Register jQuery Plugin with customized instantiation</caption>
 * Plugin('foo', Foo, (PluginWrapper) => {
 *  $(document).on(click, '[data-foo]', function(e) {
 *    e.preventDefault()
 *
 *    const $this = $(this)
 *    const data = $this.data()
 *    PluginWrapper.call($this, data)
 *  })
 * })
 *
 * @example <caption>Override global defaults</caption>
 * $.fn.lockDimension.DEFAULTS.which = false
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
function Plugin(name, Constructor, customInstantiationCB) {
  // functional API to set defaults globally
  $[name] = PluginWrapper
  // register plugin
  $.fn[name] = PluginWrapper
  $.fn[name].Constructor = Constructor
  // DEFAULTS shortcut API
  const DEFAULTS = Constructor.DEFAULTS
  $.fn[name].DEFAULTS = DEFAULTS

  // listen for DOM-Ready event
  $(domReady)

  /**
   * A really lightweight plugin wrapper around the constructor,
   * preventing against multiple instantiations and allowing any
   * public method to be called via the jQuery plugin,
   * e.g. `$(element).defaultPluginName('functionName', arg1, arg2)`
   *
   * @param {Object|string} options - Either plugin's options or if of type `string` a method to call.
   * @param {*} [rest...] - Any additional arguments passed to public method call if `options` is of type `string`.
   * @returns {*} Returns the jQuery collection itself for chainability or a value if public method returns something.
   * @constructor PluginWrapper
   */
  function PluginWrapper(options, ...rest) {
    // set defaults globally if the plugin isn't instantiated
    if (!(this instanceof $)) {
      return $.extend(DEFAULTS, options)
    }

    // Cache the method call
    // to make it possible
    // to return a value
    let returns

    this.each(function () {
      const namespace = `axa.${name}`
      let instance = $.data(this, namespace)

      // make sure to instantiate no more than once
      if (!instance) {
        instance = new Constructor(this, {
          ...DEFAULTS,
          ...options,
        })
        $.data(this, namespace, instance)
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

      // Allow instances to be destroyed via the 'destroy' method
      if (options === 'destroy') {
        $.data(this, namespace, null)
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
    // if customInstantiationCB is defined, run custom instantiation magic
    if (typeof customInstantiationCB === 'function') {
      customInstantiationCB(PluginWrapper)
    }
    // else run standard jQuery Plugin instantiation on DOM-ready event
    // eslint-disable-next-line brace-style
    else {
      $(`[data-${dasherize(name)}]`).each(function () {
        const $this = $(this)
        const options = $this.html5data(name)

        PluginWrapper.call($this, options)
      })
    }
  }
}

export default Plugin

/**
 * Use this callback for custom instantiation of your jQuery plugin.
 * This can be used if you want to delegate some events on the whole document,
 * which should lazily instantiate your plugin, e.g. datepickers, modals, etc.
 *
 * This callback gets triggered on DOM-ready event.
 *
 * @callback customInstantiationCB
 * @param {Function} PluginWrapper - Call it to instantiate your plugin the standard way.
 */
