---
title: FAQ
order: 5
template: page.jade
---

> Projects decide what third party libraries and frameworks they want to use for
> their front-end development.

# Viewport meta tag

We recommend using the following meta tag:

```html
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
```

The <code>width=device-width</code> forces
the browsers viewport to have a width that
equals the device width.
The device width means the width in CSS pixels
not in device pixels.
This means that normalization is already done.
The width for an iPhone (1136 * 640 @ 2x) in
portrait mode would be 320px.

The <code>minimum-scale=1.0</code> and
<code>maximum-scale=1.0</code> force the browser
to start at zoom 1.0 and disable pinch'n'zoom.
This will provide the most "native-app-like" experience.

If you'd like to enable pinch'n'zoom you can
replace the min and max scale with an
<code>initial-scale=1.0</code>.

Find more information on the
[Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)
or on the
[Blog of Peter Paul Koch](http://www.quirksmode.org/mobile/viewports2.html).

# X-UA-Compatible

We recommend using a <code>X-UA-Compatible</code> meta tag with
the content <code>"IE=edge"</code>.
This forces Internet Explorer not to use any compatibility mode.

This is required because there are some preferences
on the internal Internet Explorer package
to fall into compatibility mode on intranet sites as a default.
Furthermore invalid markup (HTML5 may
be considered invalid in older versions of IE)
will result in compatibility mode.

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

# Character set

We recommend the UTF-8 character set since it is a
de facto standard and we are operating in a
multilingual country in an international group.

```html
<meta charset="utf-8">
```

> Be aware that your server has to deliver the HTML
> encoded in the character set specified.

# Less compiler

Whenever you get in touch with Less we recommend
using the [official Less compiler](http://lesscss.org")
(or plugins using this compiler).
This compiler is proved to work with the Less specification
and this Developer Toolkit is based on it.

> Sometimes Less might not be enough.
> If you need further templating logic in Less files
> we recommend using Lo-Dash or something similar.
> Have a look at our <code>icons.less.lodash</code> file for
> a real world example.

# What JavaScript libraries does the Web Style Guide need?
To stay independent from any client or server side UI logic, we always develop
the HTML markup and LESS/CSS styles first, for any component. You can use
the static markup and styles to create your application and write
all the behavior using your preferred frameworks and libraries.

> JavaScript is required to implement certain behaviours the Web Style Guide
> defines.

# What about the jQuery plugins?
For most of the Blocks that require JavaScript to implement their behavior, we
provide a jQuery plugin. But you may extend or rewrite this, if needed.

# How do I combine the provided plugins with third party libraries?
Some libraries, for example AngularJS, are more intrusive and may have problems
interacting with other code. Most of the time the problem lies with multiple
components tracking and manipulating the DOM.
In this case it's often better to let go of our plugins, and implement the
behavior the way, your library intends to. Of course you may reuse code from
the Web Style Guide.

# Recommended libraries (Draft)
| Library | Remarks |
| -- | -- |
| [Knockout](http://knockoutjs.com/) | A simple, but powerful binding and templating engine |
| [Moment.js](http://momentjs.com/) | Use moment.js to handle date and time data |
| [typeahead.js](https://github.com/twitter/typeahead.js) | Simple library to create exceptional typeahead controls |
| [Select2](https://select2.github.io/) | Powerful library to create chips controls |
| [AngularJS](https://angularjs.org/) | A very powerful framework for single page web apps |
| [jQuery](https://jquery.com/) | You can use jQuery to create much of your UI behaviour |

<!--- Copyright AXA Versicherungen AG 2015 -->
