---
title: Text fields
template: design.jade
order: 1
---

A *text field* is a basic control that enables the user to type text. Use the single-line text field for entering basic values, such as a name, number or short phrase. For a longer text use a multi-line text field.

> - Optimize the virtual keyboard for the requested input format (e.g. email address, phone number, URL, PIN, date, ...)

<!--
## Character counter

To be defined
-->

# Single-line text field

## Example

<div class="form">
  <div class="form__group">
    <label class="form__group__label">Single-line text field</label>
    <div class="form__group__control">
      <input type="text" class="control control--input" value="Foo bar" />
    </div>
  </div>
</div>

## Design specs

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Text | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> Arial 14px | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
| Text color | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> #333333 | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
| Text vertical-align | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> middle | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
| Height | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 40px | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
| Width | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 100% | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
| Background | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> #efefef | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div>- |

### Focus

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Border | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 1px solid #0062A9 | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |

# Multi-line text field

When you use a multi-line text field you should start with a small text field and let it grow
as soon as the user enters more lines than fit. Add a max height to prevent huge text fields.

## Example

<div class="form">
  <div class="form__group">
    <label class="form__group__label">Multi-line text field</label>
    <div class="form__group__control">
      <textarea type="text" class="control control--textarea">Foo
Bar</textarea>
    </div>
  </div>
</div>

## Design specs

Inherits from the single-line text field

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Text vertical-align | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 15px from top | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
| Height | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 65-175px | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |


# Auto-complete text field

Use the auto-complete feature to provide real-time completions in dropdowns to enhance
accuracy and efficiency.

## Example

<div class="form">
  <div class="form__group">
    <label class="form__group__label">Multi-line text field</label>
    <div class="form__group__control">
      <div class="autocomplete">
        <input type="text" value="8" class="control control--input"/>
        <div style="position: relative;" class="autocomplete-container">
          <div class="autocomplete-item">8000 Zürich</div>
          <div class="autocomplete-item autocomplete-item--selected">8400 Winterthur</div>
          <div class="autocomplete-item">8472 Seuzach</div>
        </div>
      </div>
    </div>
  </div>
</div>

## Design specs

Inherits from the single-line text field

### Dropdown

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Max items | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 5 | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> 7 |

### Dropdown item

Inherits from the single-line text field

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Background | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> #DADADB | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |

#### hover/selected

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Text color | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> white | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
| Background | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> #0062A9 | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> - |
