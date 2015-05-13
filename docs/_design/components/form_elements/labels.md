---
title: Labels
template: design.jade
order: 1
---

Every input element needs a **label**.  Placeholder text within an input element is never enough, because users will forget what they were asked to enter very quickly. Furthermore, labels are important for accessibility and ease-of-use reasons.  Therefore, label text should always be visible and as short and clear as possible. In AXA, labels are either above an input element or left aligned (desktop only).

Very few elements don’t need a visible label such as *terms & conditions* checkboxes.

<span class="downloads" >
  <a href="../psd/AXA_forms_desktop.psd" class="downloads__link" >AXA_forms_desktop.psd</a>
  <a href="../psd/AXA_forms_mobile.psd" class="downloads__link" >AXA_forms_mobile.psd</a>
</span>

# Example

<div class="l-container">
  <div class="form">
    <div class="form__group">
      <label class="form__group__label">
        <div class="form__group__label__text">Form label</div>
      </label>
      <div class="form__group__control">
        <input type="text" class="control control--input"/>
      </div>
    </div>
  </div>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
