---
title: Text fields
template: design.jade
order: 1
---

# General

## Optimize the virtual keyboard

The virtual keyboard should be optimized for the requested input format (e.g. email address, phone number, URL, PIN, date, ...).

## Character counter

To be defined

# Single-line text field

## Example

<div class="form">
  <div class="form__group">
    <label class="form__group__label">Single-line text field</label>
    <div class="form__group__control">
      <input type="text" class="control control--input"/>
    </div>
  </div>
</div>

## Design specs

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Foobar | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 3px | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> 5px |
| Baz | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> red | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> blue |


# Multi-line text field

When you use a multi-line text field you should start with a small text field and let it grow
as soon as the user enters more lines than fit. Add a max height to prevent huge text fields.

## Example

<div class="form">
  <div class="form__group">
    <label class="form__group__label">Multi-line text field</label>
    <div class="form__group__control">
      <textarea type="text" class="control control--textarea"></textarea>
    </div>
  </div>
</div>

## Design specs

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Foobar | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 3px | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> 5px |
| Baz | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> red | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> blue |


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

|    | <i class="icon icon--mobile" ></i> | <i class="icon icon--desktop" ></i> |
| -- | -- | -- |
| Foobar | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> 3px | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> 5px |
| Baz | <div class="table__item__info__content__label" ><i class="icon icon--mobile" ></i></div> red | <div class="table__item__info__content__label" ><i class="icon icon--desktop" ></i></div> blue |
