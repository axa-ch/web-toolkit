<a name="module_registerPlugin"></a>

## registerPlugin
Exporting Plugin function directly.


* [registerPlugin](#module_registerPlugin)
    * [~PluginWrapper](#module_registerPlugin..PluginWrapper)
        * [new PluginWrapper(options)](#new_module_registerPlugin..PluginWrapper_new)
    * [~registerPlugin(name, Constructor, [callbacks])](#module_registerPlugin..registerPlugin)
    * [~customInstantiationCB](#module_registerPlugin..customInstantiationCB) : <code>function</code>
    * [~afterInstantiationCB](#module_registerPlugin..afterInstantiationCB) : <code>function</code>

<a name="module_registerPlugin..PluginWrapper"></a>

### registerPlugin~PluginWrapper
**Kind**: inner class of <code>[registerPlugin](#module_registerPlugin)</code>  
<a name="new_module_registerPlugin..PluginWrapper_new"></a>

#### new PluginWrapper(options)
A really lightweight plugin wrapper around the constructor,
preventing against multiple instantiations and allowing any
public method to be called via the jQuery plugin,
e.g. `$(element).defaultPluginName('functionName', arg1, arg2)`

**Returns**: <code>\*</code> - Returns the jQuery collection itself for chainability or a value if public method returns something.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> &#124; <code>string</code> | Either plugin's options or if of type `string` a method to call. |
| options.\_\_action\_\_ | <code>string</code> | An alternative way to specify the public method to call. |
| [rest...] | <code>\*</code> | Any additional arguments passed to public method call if `options` is of type `string`. |

<a name="module_registerPlugin..registerPlugin"></a>

### registerPlugin~registerPlugin(name, Constructor, [callbacks])
jQuery Plugin boilerplate glue code for plugin registration and instantiation.
This module is intended to streamline AXA's jQuery plugin development and to reduce boilerplate code.

**Supported features:**
- Plugin registration
- Automatic Plugin instantiation through `data-pluginName` attributes
- Handling of Plugin defaults
- Instance-specific options through `data-pluginName-optionName` attributes or options hash
- Multiple Instatiation Guard

**Kind**: inner method of <code>[registerPlugin](#module_registerPlugin)</code>  
**Requires**: <code>module:jquery</code>, <code>module:dasherize</code>, <code>module:html5data</code>  
**See**

- [How to Create a Basic Plugin](http://learn.jquery.com/plugins/basic-plugin-creation/)
- [Advanced Plugin Concepts](http://learn.jquery.com/plugins/advanced-plugin-concepts/)
- [jQuery Boilerplate](https://jqueryboilerplate.com/)
- [Extending jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate)
- [Handling plugin defaults and predefinitions](https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Handling-plugin-defaults-and-predefinitions)
- [highly-configurable.plugin.boilerplate](https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.highly-configurable.plugin.boilerplate.js)
- [jquery.boilerplate.js](https://github.com/jquery-boilerplate/jquery-boilerplate/blob/master/src/jquery.boilerplate.js)
- [jQuery Plugin Patterns](https://github.com/jquery-boilerplate/jquery-patterns)


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The unique `name` of the jQuery plugin. |
| Constructor | <code>Class</code> &#124; <code>function</code> | The concrete implementation of your jQuery plugin. |
| [callbacks] | <code>customInstantiationCB</code> &#124; <code>Object</code> | A hash of callbacks or a custom instantiation callback, use it e.g. if you need to delegate some custom events. |
| [callbacks.customInstantiationCB] | <code>customInstantiationCB</code> | A custom instantiation callback, use it e.g. if you need to delegate some custom events. |
| [callbacks.afterInstantiationCB] | <code>customInstantiationCB</code> | A after instantiation callback, use it e.g. if you need to delegate some custom events. |

**Example** *(Registering a custom jQuery plugin)*  
```js
// import the jQuery plugin boilerplate helper
import Plugin from './plugin'

// your custom Plugin implementation
class LockDimensions {
 static DEFAULTS = {
   which: 'width',
 }

 construction(element, options) {
   this.element = element
   this.options = options

   this.$element = $(element)
   this.lock()
 }

 lock() {
   if(!this.options.which || this.options.which === 'width')
     this.$element.width( this.$element.width() )

   if(!this.options.which || this.options.which === 'height')
     this.$element.height( this.$element.height() )
 }

 unlock() {
   if(!this.options.which || this.options.which === 'width')
     this.$element.css('width', '')

   if(!this.options.which || this.options.which === 'height')
     this.$element.css('height', '')
 }
}

// register your custom Plugin
registerPlugin('lockDimension', LockDimensions)
```
**Example** *(Register jQuery Plugin with customized instantiation)*  
```js
registerPlugin('foo', Foo, (PluginWrapper) => {
 $(document).on(click, '[data-foo]', function(e) {
   e.preventDefault()

   const $this = $(this)
   const data = $this.data()
   PluginWrapper.call($this, data)
 })
})
```
**Example** *(Register jQuery Plugin with after instantiation callback)*  
```js
registerPlugin('foo', Foo, {
 afterInstantiationCB: (instance, options, args) => {
   // call a method on every call to `PluginWrapper`
   instance.display(options, args)
 }
})
```
**Example** *(Override global defaults)*  
```js
$.fn.lockDimension.DEFAULTS.which = false
```
**Example** *(Override global defaults - nicer API)*  
```js
$.lockDimension({
 which: false
})
```
**Example** *(Calling a method of the plugin)*  
```js
var locked = $('#lock-me').lockDimension()

// call public method
locked.lockDimension('unlock')
```
<a name="module_registerPlugin..customInstantiationCB"></a>

### registerPlugin~customInstantiationCB : <code>function</code>
Use this callback for custom instantiation of your jQuery plugin.
This can be used if you want to delegate some events on the whole document,
which should lazily instantiate your plugin, e.g. datepickers, modals, etc.

This callback gets triggered on DOM-ready event.

**Kind**: inner typedef of <code>[registerPlugin](#module_registerPlugin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| PluginWrapper | <code>function</code> | Call it to instantiate your plugin the standard way. |

<a name="module_registerPlugin..afterInstantiationCB"></a>

### registerPlugin~afterInstantiationCB : <code>function</code>
Use this callback for custom code after instantiation of your jQuery plugin.
This can be used if you want to delegate some events on the whole document,
which should lazily show/hide your plugin, e.g. datepickers, modals, etc.

This callback gets triggered after each call to `PluginWrapper`.

**Note**
This callback is not executed if `options` is `'destroy'`.

**Kind**: inner typedef of <code>[registerPlugin](#module_registerPlugin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>Object</code> | The instance of the current jQuery Plugin. |
| options | <code>Object</code> | Either plugin's options or if of type `string` a method to call. |
| args | <code>Array</code> | Any additional arguments, either ...rest or args. |

