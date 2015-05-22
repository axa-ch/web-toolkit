---
title: BEM
template: development.jade
order: 3
---

# What is BEM?

BEM stands for Block, Element Modifier and describes a set of front end
development techniques. BEM is originated by the Russian internet giant Yandex.

We adopted the BEM methodology in the Web Design Guide. Each component
defined by the Design Guidelines is implemented by one or more blocks.
Therefore the CSS and HTML is aligned to BEM.

This is a quick overview over the BEM methodology and how we adapted it to
fit our needs. If you want to take a deep dive head over to
[bem.info](https://bem.info/method/definitions/).


> We recommend using the same principles for your app, to enhance integration
> of the Web Design Guide and enhance your web development experience.

# Blocks

A page consists of several blocks, such as header, footer, menu and more.

Blocks are always independent. This means that they could appear anywhere on
any page or even multiple times on the same page. For example a menu block may
appear once on top of the page and once on the side to create a two-step
navigation.

Blocks can contain elements and also other nested blocks to reuse
functionality and minimize complexity. A block describes the order
in which it's children appear.

# Elements

Elements are always part of a block and are thus context dependent.
They cannot exist on their own.

For example, a menu item can only exist inside a menu. Makes sense, right?

# Modifiers

Modifiers define the styling of a block or element. Every modifier has its
own CSS class. This way you can use a menu block for a top navigation, and
another for a side navigation and give them both the appropriate styling.

Multiple modifiers in a block or element are allowed.

# Naming

Block names must be unique within the project and element names must be unique
within their block.
We separate nested blocks and elements with the <code>__</code>
(double lower dash) sequence and modifiers from blocks and elements with the
<code>--</code> (double dash) sequence.

> Don't use names in your app, that are already used by the Web Design Guide.

# Independent CSS

To achieve block independence, so that blocks can be on their own and anywhere
on a page, we follow the following rules in our CSS definitions:

* HTML elements (<code>h1</code>, <code>p</code>, <code>div</code>)
  <strong>must not</strong> be used in CSS selectors.
* Cascading selectors (<code>.menu.menu--item { ... }</code>)
  <strong>should not</strong> be used.
* ID based selectors (<code>#menu { ... }</code>) <strong>must not</strong>
  be used.


# Javascript

You should apply behaviour with javascript on block level. Use CSS classes to
select every instance of a block on your page.

If you have the need, you can also write a Javascript libraray to easily
access blocks and elements.

<!-- Copyright AXA Versicherungen AG 2015 -->
