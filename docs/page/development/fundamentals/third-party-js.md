---
title: Third Party JavaScript
template: page.jade
order: 7
status: experimental
---

> Projects decide what third party libraries and frameworks they want to use for
> their front-end development.

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

<!-- Copyright AXA Versicherungen AG 2015 -->
