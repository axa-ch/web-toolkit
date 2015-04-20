---
title: Text fields
template: design.jade
order: 1
---

A **text field** is a basic control that enables the user to type text. Use the single-line text field for entering basic values, such as a name, number or short phrase. For a longer text use a multi-line text field.

Most systems support placeholder text within text fields. Placeholder text is only used if necessary and needs to be visually distinguishable from entered data. Placeholder text must not be used to replace a [label](http://design.axa.ch/design/components/form_elements/labels.html).

> - Optimize the virtual keyboard for the requested input format (e.g. email address, phone number, URL, PIN, date, ...)

<!--
## Character counter

To be defined
-->

<span class="downloads" >
  <a href="../psd/AXA_forms_desktop.psd" class="downloads__link" >AXA_forms_desktop.psd</a>
  <a href="../psd/AXA_forms_mobile.psd" class="downloads__link" >AXA_forms_mobile.psd</a>
</span>

# Single-line text field

## Example

<div style="max-width: 700px" >
  <input type="text" class="control control--input" value="Foo bar" />
</div>

# Multi-line text field

When you use a multi-line text field you should start with a small text field and let it grow
as soon as the user enters more lines than fit. Add a max height to prevent huge text fields.

## Example

<div style="max-width: 700px" >
  <textarea type="text" class="control control--textarea">Foo
Bar</textarea>
</div>

# Auto-complete text field

Use the auto-complete feature to provide real-time completions in dropdowns to enhance
accuracy and efficiency.

## Example

<div class="autocomplete" style="max-width: 700px">
  <input type="text" class="control control--input"/>
  <div style="position: relative;" class="autocomplete__suggestions">
    <div class="autocomplete__suggestions__item">8000 Zürich</div>
    <div class="autocomplete__suggestions__item autocomplete__suggestions__item--selected">8400 Winterthur</div>
    <div class="autocomplete__suggestions__item">8472 Seuzach</div>
  </div>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
