---
title: Changelog
slug: changelog
template: other.jade
---

# 0.3.0 - 11 Mar, 2015

- Documentation changes
  - Restructured and redesigned design guidelines
  - Improved developer toolkit docs
    - You can now copy less color variable names (requires flash)
    - Added some words about media queries
- New components
  - File upload (single and multi file upload)
  - List
  - Floating action button
- Renamed `progress` block to `progress-tracker`
- Bugfixes
  - Autocomplete z-index [#200](https://github.com/axa-ch/style-guide/issues/200)
    - Introduced z-index-* variables in the `variables.less.lodash` file.
  - Vertical center form labels (in relation to a `control--input` block)
    - ATTENTION! This requires a markup change for the `form__group__label`!

# 0.2.1 - 11 Feb, 2015

- Add missing import statements to info-icon.less

# 0.2.0 - 5 Feb, 2015

- Documentation improvements
  - Browser support guidelines
  - Remove names and less variables from design guideline color palette
  - Add color palette to developer toolkit
    - Includes LESS variable names
    - Color codes can be copied to clipboard by clicking on the table row
  - Add some words about the BEM methodology
- New components
  - Modal
  - Autocomplete
  - Datepicker
  - Tile select (experimental)
- New plugins
  - Datepicker
  - Autocomplete
- Improvements
  - Add checkmarks to step block
- Bugfixes
  - Fix display issues for mobile table in IE9
  - Font weight on buttons is now normal
- Internals
  - Add header to example pages
  - Cache jade templates during build

# 0.1.0 - 22 Jan, 2015

Initial release
