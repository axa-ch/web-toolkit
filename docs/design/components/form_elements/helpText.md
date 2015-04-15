---
title: Help Texts
template: design.jade
order: 2
---

#Help Text

Help text can be provided to help users fill in the form and to clear up questions. Still, don’t use labels to fix shortcomings of bad form design or unclear label text.
Help text slides in after the user clicks or taps on the information icon. It is always displayed just below the affected element(s).

>Checklist: Help Text
- Avoid help texts wherever and whenever possible.
- Use it to explain unfamiliar data or why the question is asked at all.
- Help text is always placed outside the input field and never inside.
- Unless you have a lot of help text, use an inline system. This avoid page-jumping and rollover problems.
- Triggers for user-activated help text should be placed next to labels and not input fields.

##Example
#HIER MUSS EIN FUNKTIONIERENDES i-ICON EINGEBAUT WERDEN
<div class="l-container">
  <div class="form">
    <div class="form__group">
      <div class="form__group__label">
        <div class="form__group__label__info-icon">
          <div class="info-icon"></div>
        </div>
        <label class="form__group__label__info-icon-text-wrapper">
          <div class="form__group__label__text">Form label</div>
        </label>
      </div>
      <div class="form__group__control">
        <input type="text" class="control control--input"/>
        <div class="form__info-text">
          <div class="info-text">
            <p>Hallo Welt!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
