/**
 * Exporting Plugin function directly.
 * @module registerPlugin
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
 * @function registerPlugin
 * @param {string} name - The unique `name` of the jQuery plugin.
 * @param {Class|Function} Constructor - The concrete implementation of your jQuery plugin.
 * @param {customInstantiationCB|Object} [callbacks] - A hash of callbacks or a custom instantiation callback, use it e.g. if you need to delegate some custom events.
 * @param {customInstantiationCB} [callbacks.customInstantiationCB] - A custom instantiation callback, use it e.g. if you need to delegate some custom events.
 * @param {customInstantiationCB} [callbacks.afterInstantiationCB] - A after instantiation callback, use it e.g. if you need to delegate some custom events.
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
 * registerPlugin('lockDimension', LockDimensions)
 *
 * @example <caption>Register jQuery Plugin with customized instantiation</caption>
 * registerPlugin('foo', Foo, (PluginWrapper) => {
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
function registerPlugin(name, Constructor, callbacks) {
  let customInstantiationCB
  let afterInstantiationCB

  if (typeof callbacks === 'function') {
    customInstantiationCB = callbacks
  } else if (typeof callbacks === 'object') {
    customInstantiationCB = callbacks.customInstantiationCB
    afterInstantiationCB = callbacks.afterInstantiationCB
  }
  // cache callbacks


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
   * @param {string} options.\_\_action\_\_ - An alternative way to specify the public method to call.
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

      // If the first parameter is a string or `__action__` is a property
      // and it is available as a method of the plugin,
      // treat this as a call to a public method.
      // eslint-disable-next-line no-underscore-dangle
      const action = typeof options === 'object' ? options.__action__ : options

      if (typeof action === 'string'
        && action in instance
        && typeof instance[action] === 'function') {
        // Call the method of our plugin instance,
        // and pass it the supplied arguments.
        returns = instance[action].apply(instance, rest || arguments)
      }

      // Allow instances to be destroyed via the 'destroy' method
      if (options === 'destroy') {
        $.data(this, namespace, null)
      } else if (typeof afterInstantiationCB === 'function') {
        afterInstantiationCB(instance, options, rest || arguments)
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

export default registerPlugin

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

/**
 * Use this callback for custom code after instantiation of your jQuery plugin.
 * This can be used if you want to delegate some events on the whole document,
 * which should lazily show/hide your plugin, e.g. datepickers, modals, etc.
 *
 * This callback gets triggered after each call to `PluginWrapper`.
 *
 * @callback afterInstantiationCB
 * @param {Object} instance - The instance of the current jQuery Plugin.
 * @param {Object} options - Either plugin's options or if of type `string` a method to call.
 * @param {Array} args - any additional arguments.
 */
