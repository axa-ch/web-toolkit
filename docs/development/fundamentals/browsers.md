---
title: Browser support
template: development.jade
order: 4
---

> The following article is based on data collected
> by analytics tools. The article is based on a
> snapshot as of 21. January 2015.
>
> We do our best to update the analytics data
> regulary.

# Internal vs. external web apps/sites

The browser support requirements in this chapter
apply to internal and external web apps/sites.

# Stick to web standards

First of all we should stick to web standards
defined by the w3c and not to browser specific
technologies or features. Therefore new browser
releases should be supported out of the box.
When it comes to older browsers we have to test
our web apps/sites on these browsers in detail.

# What browsers to support?

As mentioned above we need to test our web apps/sites
on diffrent browsers, especially the older ones.

We created the following list of browsers you
should support based on analytics data per
21. January 2015.

> TODO
> We should dig into the Android 5.0 (Lollipop) browser. It seems that a chrome 37 is used.

| Browser | Platform | Version |
| -- | -- | -- |
| Internet Explorer | Windows | 9+ |
| Firefox |	Desktop	| 34.0+ |
| Chrome |	Desktop, Android, iOS	| 39.0.2171+ |
| Android Browser |	Android	| 4.0+ |
| Safari |	Mac	| 8.0+ |
| Safari |	iOS	| 8.0+ |
| Chrome |	iOS	| 8.1+ |

# Internet Explorer 8

With the current release Internet Explorer 8 is NOT
supported. Please consider adding a "Your browser
is not supported page" or add support for IE 8.

* IE 8 doesn't like CSS selectors which contain
  double-colon CSS 3 pseudo element selectors (
  ::after). Even the selector "::after, :after"
  will be ignored because there is one
  double-colon CSS 3 pseudo element.
* To make the CSS work in IE 8 you need to duplicate
  all rules containing double-colon selectors
  and replace the double-color with a single-color.
* Include respond.js and HTML5SHIV to support
  CSS 3 media queries and HTML5 Tags.
* IE8 doesn't support the border-radius property.
  You should either include a shim or live without
  round borders.
* Since jQuery 2.0 dropped support for IE 8 in favour
  of a performance boost you need to use jQuery &lt;2.0

<!-- Copyright AXA Versicherungen AG 2015 -->
