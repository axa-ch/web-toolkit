---
title: Segmented Control
template: design.jade
order: 1
---

A **segmented control** is a basic control that enables the user to make a single selection from just a few options. A single tab or click enables the user to choose a value. Default values can be set if appropriate - if in doubt, do not set defaults.

Do not use a segmented control if the user has to choose from many different options. In this case, use a [dropdown element](#) or a grid view.

<span class="downloads" >
  <a href="../psd/AXA_forms_desktop.psd" class="downloads__link" >AXA_forms_desktop.psd</a>
  <a href="../psd/AXA_forms_mobile.psd" class="downloads__link" >AXA_forms_mobile.psd</a>
</span>

## Example
<div data-segmented-control="data-segmented-control" class="segmented-control">
  <label class="segmented-control__item">
    <input type="radio" name="bar" class="segmented-control__item__radio"/><span class="segmented-control__item__label">Ja</span>
  </label>
  <label class="segmented-control__item">
    <input type="radio" name="bar" class="segmented-control__item__radio"/><span class="segmented-control__item__label">Nein</span>
  </label>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
