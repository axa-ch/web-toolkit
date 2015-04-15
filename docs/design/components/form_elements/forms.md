---
title: Form groups
template: design.jade
order: 0
draft: true
---

A **form group** is used to group a label and a form control (e.g. text field).
There is the possiblity to add an error message and/or an info text.

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

## Design specs

|    | <i class="icon icon--mobile" ></i>| <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- | -- |
| Label width | 12 columns | 6 columns | 5 columns |
| Label text | Arial 14px | Arial 14px | Arial 14px |
| Label color | #333333 | #333333 | #333333 |
| Label vertical-align | 10px offset to the control | middle of top 40px | middle of top 40px |
| Control width | 12 columns | 6 columns | 6 columns |

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

## Design specs

|    | <i class="icon icon--mobile" ></i>| <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- | -- |
| TBD | TBD | TBD | TBD |


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

## Design specs

| | <i class="icon icon--mobile" ></i>| <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- | -- |
| Control width | 12 columns | 12 columns | 11 columns |
<!-- Copyright AXA Versicherungen AG 2015 -->
