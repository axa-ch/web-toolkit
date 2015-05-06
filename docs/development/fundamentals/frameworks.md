---
title: Third Party Extensions
template: development.jade
order: 7
status: experimental
---

> Projects decide what third party libraries and frameworks they want to use for
> their front-end development. These are some tips and recommendations to help
> you decide.

# What JavaScript libraries does the Web Style Guide need?
The Web Style Guide in it's purest form does not require any JavaScript
libraries. It provides only html block definitons and less or css stylesheets,
as well as some fonts and a few image assets.

> JavaScript is required to implement certain behaviours the Web Style Guide
> defines. The Web Style Guide provides JavaScript implementations for the
> behavior of many blocks to make your life easier.

# What about the jQuery plugins?
For most of the Blocks that require JavaScript to implement their behavior, we
provide a jQuery plugin.

In order to provide the most flexibility for users of the Web Style Guide,
we try to reduce usage of third party libraries in the components we provide
and thus, wrote them by ourselves. We mostly use only jQuery without any plugins
in our code. We do make use of moment.js, to handle dates, in some cases.

> In some cases they provide only rudimentary functionality and you may want to
> extend or replace it. You can use other third libraries such as jQuery UI too.

# How do I combine the provided plugins with third party libraries?
Many libraries can be used together with our own without any problems. But some,
for example AngularJS, are more intrusive and sometimes have problems
interacting with other code. Most of the time the problem lies with multiple
components tracking and manipulating the DOM.
In this case it's often better to let go of our plugins, and implement the
behavior the way, your library intends to.

# Recommended libraries? (Draft)
* jQuery
* moment.js
* Knockout
* AngularJS
* ...

<!-- Copyright AXA Versicherungen AG 2015 -->
