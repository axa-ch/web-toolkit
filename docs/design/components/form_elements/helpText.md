---
title: Help Texts
template: design.jade
order: 2
---

Help text can be provided to help users fill in the form and to clear up questions. Still, don’t use labels to fix shortcomings of bad form design or unclear label text.
Help text slides in after the user clicks or taps on the information icon. It is always displayed just below the affected element(s).

<span class="downloads" >
  <a href="../psd/AXA_forms_desktop.psd" class="downloads__link" >AXA_forms_desktop.psd</a>
  <a href="../psd/AXA_forms_mobile.psd" class="downloads__link" >AXA_forms_mobile.psd</a>
</span>

>Checklist: Help Text
- Avoid help texts wherever and whenever possible.
- Use it to explain unfamiliar data or why the question is asked at all.
- Help text is always placed outside the input field and never inside.
- Unless you have a lot of help text, use an inline system. This avoid page-jumping and rollover problems.
- Triggers for user-activated help text should be placed next to labels and not input fields.

##Example

<div class="form">
  <div class="form__group">
    <div class="form__group__label">
      <div class="form__group__label__info-icon"><a data-info="data-info" data-target="#target" class="info-icon is-active"></a></div>
      <label class="form__group__label__info-icon-text-wrapper">
        <div class="form__group__label__text">Was wurde beschädigt?</div>
      </label>
    </div>
    <div class="form__group__control">
      <input type="text" class="control control--input">
      <div id="target" style="display: block;" class="form__info-text">
        <div class="info-text">
          <p>Hallo Welt!</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
