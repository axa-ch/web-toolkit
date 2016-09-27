<a name="Modal2"></a>

## Modal2
**Kind**: global class  
**Requires**: <code>module:jquery</code>, <code>module:baconjs</code>, <code>module:register-plugin</code>, <code>module:append</code>, <code>module:icon</code>, <code>module:html5data</code>  

* [Modal2](#Modal2)
    * [new Modal2()](#new_Modal2_new)
    * _instance_
        * [.Options](#Modal2+Options) : <code>Object</code>
    * _inner_
        * [~onBeforeOpen](#Modal2..onBeforeOpen) : <code>function</code>
        * [~onAfterOpen](#Modal2..onAfterOpen) : <code>function</code>
        * [~onBeforeClose](#Modal2..onBeforeClose) : <code>function</code>
        * [~onAfterClose](#Modal2..onAfterClose) : <code>function</code>

<a name="new_Modal2_new"></a>

### new Modal2()
Modal2 implements an encapsulated modal layer with a backdrop.

<a name="Modal2+Options"></a>

### modal2.Options : <code>Object</code>
The Modal-2 takes the following list of optional options.

**Note:**
All of those options can also be assigned through HTML `data-modal2-*` attributes.
Except `href` attribute is also considered for opening links in a modal manner.

```html
<a href="foo.html"
 data-modal2-autofocus="true"
 data-modal2-backdrop-close="true"
 data-modal2-close-aria-label="close"
 data-modal2-close-enabled="true"
 data-modal2-close-position="inside"
 data-modal2-classes="{
   body: 'modal2-is-open',
   modal: 'modal2',
   backdrop: 'modal2__backdrop',
   content: 'modal2__content',
   close: 'modal2__close',
   icon: 'modal2__close__icon',
   open: 'is-open'
 }"
 data-modal2-escape-close="true"
 data-modal2-hide-main-scroll-bar="true"
 data-modal2-mode="scroll"
 data-modal2-selector=".foo">
```

**Kind**: instance typedef of <code>[Modal2](#Modal2)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autofocus | <code>boolean</code> | <code>true</code> | Should the modal automtically be focused. |
| backdropClose | <code>boolean</code> | <code>true</code> | Close the modal if it's backdrop is clicked. |
| closeAriaLabel | <code>string</code> | <code>&quot;close&quot;</code> | ARIA label for close button. |
| closeEnabled | <code>boolean</code> | <code>true</code> | Whether a close button is enabled or not. |
| closePosition | <code>string</code> | <code>&quot;inside&quot;</code> | The position of the close button, currently `'inside'` or `'outside'`. |
| classes | <code>Object</code> |  | A hash of class names which are rendered by this plugin. |
| classes.body | <code>string</code> | <code>&quot;modal2-is-open&quot;</code> | A class which is appended to the body like `<body class="modal2-is-open"`> to hide scroll bars. |
| classes.modal | <code>string</code> | <code>&quot;modal2&quot;</code> | The modal2 block class. |
| classes.backdrop | <code>string</code> | <code>&quot;modal2__backdrop&quot;</code> | The modal2's backdrop element class. |
| classes.content | <code>string</code> | <code>&quot;modal2__content&quot;</code> | The modal2's content element class. |
| classes.close | <code>string</code> | <code>&quot;modal2__close&quot;</code> | The modal2's close element class. |
| classes.icon | <code>string</code> | <code>&quot;modal2__close__icon&quot;</code> | The modal2's close icon element class. |
| classes.open | <code>string</code> | <code>&quot;is-open&quot;</code> | The modal2's is-open state class. |
| escapeClose | <code>boolean</code> | <code>true</code> | Closing the modal if `Esc` key is pressed. |
| hideMainScrollbar | <code>boolean</code> | <code>true</code> | Hide the main scrollbar. |
| mode | <code>string</code> | <code>&quot;scroll&quot;</code> | The overflow control mode of the model, either `'scroll'` which means handled by the model itself or `'fullscreen'` which means delegated to encapsulated content. |
| onBeforeOpen | <code>[onBeforeOpen](#Modal2..onBeforeOpen)</code> |  | A callback before the modal opens. |
| onAfterOpen | <code>[onAfterOpen](#Modal2..onAfterOpen)</code> |  | A callback after the modal has been opened. |
| onBeforeClose | <code>[onBeforeClose](#Modal2..onBeforeClose)</code> |  | A callback before the modal closes. |
| onAfterClose | <code>[onAfterClose](#Modal2..onAfterClose)</code> |  | A callback after the modal has been closed. |
| selector | <code>string</code> |  | A CSS-Selector to feed the modal's content with just a portion of the supplied markup. |

<a name="Modal2..onBeforeOpen"></a>

### Modal2~onBeforeOpen : <code>function</code>
This callback triggers before the modal opens.

**Kind**: inner typedef of <code>[Modal2](#Modal2)</code>  
**Returs**: <code>Boolean\|\*</code> - Return `false` to prevent the default content aquisition process.  

| Type | Description |
| --- | --- |
| <code>[Modal2](#Modal2)</code> | The current Modal2 instance. |
| <code>function</code> | A function which inserts the passed HTML into the modal. |

<a name="Modal2..onAfterOpen"></a>

### Modal2~onAfterOpen : <code>function</code>
This callback triggers after the modal has been opened.

**Kind**: inner typedef of <code>[Modal2](#Modal2)</code>  

| Type | Description |
| --- | --- |
| <code>[Modal2](#Modal2)</code> | The current Modal2 instance. |

<a name="Modal2..onBeforeClose"></a>

### Modal2~onBeforeClose : <code>function</code>
This callback triggers before the modal closes.

**Kind**: inner typedef of <code>[Modal2](#Modal2)</code>  

| Type | Description |
| --- | --- |
| <code>[Modal2](#Modal2)</code> | The current Modal2 instance. |

<a name="Modal2..onAfterClose"></a>

### Modal2~onAfterClose : <code>function</code>
This callback triggers after the modal has been closed.

**Kind**: inner typedef of <code>[Modal2](#Modal2)</code>  

| Type | Description |
| --- | --- |
| <code>[Modal2](#Modal2)</code> | The current Modal2 instance. |

