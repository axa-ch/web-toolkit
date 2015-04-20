---
title: Buttons
template: design.jade
order: 3
---

Use a label and/or an icon to make it clear to the user what happens when he clicks / taps a button. Placement and behaviour of buttons should avoid mistakes. There are two types of buttons:

- Regular button: A rectangular button that represents a primary or secondary action of a section
- Floating action button: A circular button representing an *important action that is omnipresent*

> - Avoid secondary actions whenever possible
> - Previous always stays left of next
> - Group actions
> - Always set a useful label and/or icon, to let the user know what will happen next

<span class="downloads" >
  <a class="downloads__link downloads__link--inactive" >COMING SOON</a>
</span>

# Floating action buttons

The floating action button consists of an icon only, it can't contain a label. This type of button
is used to represent an action that is important and ubiquitous.

Avoid this type of button for destructive actions like delete, nonspecific actions, alerts or errors.

A floating action button shouldn't be placed in a random location. It must not overlap with or cover other touch targets.  

See the feedback button on the bottom right corner of this page for an example.

## Example

<div>
  <a class="button button--floating icon icon--feedback"></a>
</div>

# Regular buttons

## Should I use a small button?

Try to avoid the usage of small buttons. Use them when there is not enough space for a large button.

## Example

<div>
  <a class="button button--secondary">Secondary action</a>
  <a class="button icon icon--arrow-right"> Primary action</a>
</div>

## Example

<div>
  <a class="button button--small button--secondary icon--arrow-left"> Secondary action</a>
  <a class="button button--small">Primary action</a>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
