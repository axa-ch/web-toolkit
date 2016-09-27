## Modules

<dl>
<dt><a href="#module_html5data">html5data</a></dt>
<dd><p>Extending jQuery&#39;s prototype directly.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#html5data">html5data(namespace)</a> ⇒ <code>Object</code></dt>
<dd><p>The HTML5 <code>data-{namespace}-*</code> jQuery Plugin retrieves a hash of namespace-filtered options.
Non-Namespaced options are always overwritten by namespaced options, like:
<code>data-namespace-option=&quot;bar&quot;</code> overwrites <code>data-option=&quot;baz&quot;</code>.</p>
</dd>
</dl>

<a name="module_html5data"></a>

## html5data
Extending jQuery's prototype directly.

<a name="html5data"></a>

## html5data(namespace) ⇒ <code>Object</code>
The HTML5 `data-{namespace}-*` jQuery Plugin retrieves a hash of namespace-filtered options.
Non-Namespaced options are always overwritten by namespaced options, like:
`data-namespace-option="bar"` overwrites `data-option="baz"`.

**Kind**: global function  
**Returns**: <code>Object</code> - Returns `data-*` attribute options filtered for given `namespace`.  
**Requires**: <code>module:jquery</code>  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | The HTML5 `data-*` attribute namespace. |

