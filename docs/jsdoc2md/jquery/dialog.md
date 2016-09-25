<a name="Dialog"></a>

## Dialog
**Kind**: global class  
**Requires**: <code>module:jquery</code>, <code>module:register-plugin</code>, <code>module:icon</code>  

* [Dialog](#Dialog)
    * [new Dialog()](#new_Dialog_new)
    * [.Options](#Dialog+Options) : <code>Object</code>

<a name="new_Dialog_new"></a>

### new Dialog()
Dialog implements UI which is wrapped inside an Modal2 instance.

<a name="Dialog+Options"></a>

### dialog.Options : <code>Object</code>
The Dialog takes the following list of optional options.

**Note:**
All of those options can also be assigned through HTML `data-dialog-*` attributes like:

```html
<div data-dialog-classes="{
   dialog: 'dialog',
   header: 'dialog__header',
   heading: 'dialog__heading',
   close: 'dialog__close',
   icon: 'dialog__close__icon',
   content: 'dialog__content',
   footer: 'dialog__footer'
 }"
 data-dialog-close-aria-label="close"
 data-dialog-position="middle"
 data-dialog-modal="{...}">
```

**Kind**: instance typedef of <code>[Dialog](#Dialog)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| classes | <code>Object</code> |  | A hash of class names which are rendered by this plugin. |
| classes.dialog | <code>string</code> | <code>&quot;dialog&quot;</code> | The dialog block class. |
| classes.header | <code>string</code> | <code>&quot;dialog__header&quot;</code> | The dialogs's backdrop element class. |
| classes.heading | <code>string</code> | <code>&quot;dialog__heading&quot;</code> | The dialogs's content element class. |
| classes.close | <code>string</code> | <code>&quot;dialog__close&quot;</code> | The dialogs's close element class. |
| classes.icon | <code>string</code> | <code>&quot;dialog__close__icon&quot;</code> | The dialogs's close icon element class. |
| classes.content | <code>string</code> | <code>&quot;dialog__content&quot;</code> | The dialogs's backdrop element class. |
| classes.footer | <code>string</code> | <code>&quot;dialog__footer&quot;</code> | The dialogs's content element class. |
| closeAriaLabel | <code>string</code> | <code>&quot;close&quot;</code> | ARIA label for close button. |
| position | <code>string</code> | <code>&quot;middle&quot;</code> | A string specifying the dialogs vertical position - `'top'`, `'middle'` or `'bottom'`. |
| modal | <code>Modal2#Options</code> |  | Specific options for the associated Modal2 instance. |

