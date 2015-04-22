---
title: Layout
template: design.jade
order: 7
---

Layouts are an essential part in web design since
they define how components are composed and arranged.

When searching for the right layout, it's recommended to ask
yourself about your needs in these two areas:

* Page layout
* Navigation layout

# Page layout

Always try to chose only one page layout throughout your
application to avoid an inconsistent and jarring experience.

## Fixed width page layout

![Fixed width page layout](/images/design/fundamentals/layout/fixed-width.svg)

The _fixed width_ page layout is the default page layout.
It deliberately constraints the overall width of the content
and horizontally centers it on the page.

This gives the designer more control and can be useful for
when a more predictable layout with easy to read line lengths
is needed.

Conversely, it constrains the amount of space available to content
and takes away control over presentation from the user.  

## Fluid page layout

![Fluid page layout](/images/design/fundamentals/layout/fluid.svg)

The _fluid_ page layout provides maximum space for content
in all sizes, and leaves control over the size of the UI
to the user by automatically adjusting to fit the size of their browser.

An issue to be aware of is that some types of content
(like large bodies of text) can become hard to read due to
excessively long line lengths if nothing is done to mitigate this.

# Navigation layout

The factor that most remarkably defines an applications layout
is the amount of data and the complexity of its navigation.

A single page can contain up to four navigational areas. Each can
be used independently from all others, as long as the usage
follows the following guidelines.

![Navigation areas](/images/design/fundamentals/layout/navigations.svg)

## Meta navigation area

The _meta_ navigation area (<span class="tag tag--success">1</span>).

## Horizontal navigation area

The _horizontal_ navigation area (<span class="tag tag--success">2</span>).

## Vertical navigation area

The _vertical_ navigation area (<span class="tag tag--success">3</span>).

## Footer navigation area

The _footer_ navigation area (<span class="tag tag--success">4</span>).

# Common layouts

Certain kind of applications can sometimes be assigned to a selected
range of layouts or even a specific one. If you find your application type
here, try to use the recommended layout. This gives more consistency
across different applications.

## Power user application

![Power user layout](/images/design/fundamentals/layout/common-power-user.svg)

## Web site

![Web site layout](/images/design/fundamentals/layout/common-web-site.svg)

## Landing page

![Landing page layout](/images/design/fundamentals/layout/common-landing.svg)

<!-- Copyright AXA Versicherungen AG 2015 -->
