---
title: Recommendations
template: development.jade
order: 6
---

> Please note that these recommendations are a working draft.

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

<!-- Copyright AXA Versicherungen AG 2015 -->
