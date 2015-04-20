---
title: Form groups
template: design.jade
order: 0
draft: true
---

A **form group** is used to group a label and a form control (e.g. text field).
There is the possiblity to add an error message and/or an info text.

<span class="downloads" >
  <a href="../psd/AXA_forms_desktop.psd" class="downloads__link" >AXA_forms_desktop.psd</a>
  <a href="../psd/AXA_forms_mobile.psd" class="downloads__link" >AXA_forms_mobile.psd</a>
</span>

# Basic form group

## Example

<div style="max-width: 700px" >
  <div class="form__group">
    <label class="form__group__label">
      Some label
    </label>
    <div class="form__group__control">
      <input type="text" class="control control--input" value="form control" />
    </div>
  </div>
</div>

# Error message

## Example

<div style="max-width: 700px" >
  <div class="form__group">
    <label class="form__group__label">
      Some label
    </label>
    <div class="form__group__control">
      <input type="text" class="control control--input" value="form control" />
      <div class="form__error-message" >
        Something went terribly wrong!
      </div>
    </div>
  </div>
</div>

# Form group without label

You can omit the label in some use cases (e.g. privacy checkmark).

## Example

<div style="max-width: 700px" >
  <div class="form__group">
    <div class="form__group__control form__group__control--fullwidth">
      <label data-checkbox="data-checkbox" class="checkbox">
        <input type="checkbox" class="checkbox__checkbox"/>
        <div class="checkbox__label">
          <div class="checkbox__label__text"><span>Full width control</span></div>
        </div>
      </label>
    </div>
  </div>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
