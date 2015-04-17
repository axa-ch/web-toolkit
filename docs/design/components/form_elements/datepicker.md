---
title: Datepicker
template: design.jade
order: 4
---

<a href="../psd/AXA_forms_desktop.psd" class="download download--desktop" >Download PSD (Desktop)</a>

<a href="../psd/AXA_forms_mobile.psd" class="download download--mobile" >Download PSD (Mobile)</a>

The **datepicker** component is meant to help a user select an appropriate date.
You can use a placeholder to display a sample date. In some cases, such as
search, default values may be used.

# Mobile

On mobile devices, switch to using the native datepicker provided by the browser
and operating system. Use device detection via the user agent property of
the browser to make the switch.

# Example

<div id="myDatepicker" data-datepicker-watch="#myDatepickerInput" class="datepicker"><a data-datepicker="#myDatepicker" class="datepicker__trigger"></a>
  <div class="datepicker__input">
    <input type="text" id="myDatepickerInput" class="control control--input"/>
  </div>
</div>

<!-- Copyright AXA Versicherungen AG 2015 -->
