---
title: Text fields
template: design.jade
order: 1
---

<a href="../psd/form.psd" class="download" >Download Photoshop files</a>

A **text field** is a basic control that enables the user to type text. Use the single-line text field for entering basic values, such as a name, number or short phrase. For a longer text use a multi-line text field.

Most systems support placeholder text within text fields. Placeholder text is only used if necessary and needs to be visually distinguishable from entered data. Placeholder text must not be used to replace a [label](http://design.axa.ch/design/components/form_elements/labels.html).

> - Optimize the virtual keyboard for the requested input format (e.g. email address, phone number, URL, PIN, date, ...)

<!--
## Character counter

To be defined
-->

# Single-line text field

## Example

<div style="max-width: 700px" >
  <input type="text" class="control control--input" value="Foo bar" />
</div>

## Design specs

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Text | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> Arial 14px | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> Arial 14px |
| Text color | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> #333333 | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> #333333 |
| Text vertical-align | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> middle | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> middle |
| Height | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> 40px | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> 40px |
| Width | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> 100% | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> 100% |
| Background | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> #efefef | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> #efefef |

### Focus

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Border | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> 1px solid #0062A9 | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> 1px solid #0062A9 |

# Multi-line text field

When you use a multi-line text field you should start with a small text field and let it grow
as soon as the user enters more lines than fit. Add a max height to prevent huge text fields.

## Example

<div style="max-width: 700px" >
  <textarea type="text" class="control control--textarea">Foo
Bar</textarea>
</div>

## Design specs

Inherits from the single-line text field

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Text vertical-align | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> 15px from top | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> 15px from top |
| Height | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> 65-175px | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> 65-175px |


# Auto-complete text field

Use the auto-complete feature to provide real-time completions in dropdowns to enhance
accuracy and efficiency.

## Example

<div style="max-width: 700px" >
  <div class="autocomplete">
    <input type="text" value="8" class="control control--input"/>
    <div style="position: relative;" class="autocomplete-container">
      <div class="autocomplete-item">8000 Zürich</div>
      <div class="autocomplete-item autocomplete-item--selected">8400 Winterthur</div>
      <div class="autocomplete-item">8472 Seuzach</div>
    </div>
  </div>
</div>

## Design specs

Inherits from the single-line text field

### Dropdown

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Max items | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> 5 | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> 7 |

### Dropdown item

Inherits from the single-line text field

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Background | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> #DADADB | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> #DADADB |

#### hover/selected

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Text color | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> white | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> white |
| Background | <div class="table__row__item__content__label" ><i class="icon icon--mobile" ></i></div> #0062A9 | <div class="table__row__item__content__label" ><i class="icon icon--desktop" ></i></div> #0062A9 |
<!-- Copyright AXA Versicherungen AG 2015 -->
