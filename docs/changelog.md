---
title: Changelog
slug: changelog
template: other.jade
---

# 0.4.0 - not yet released

- Rename the package to `axa-web-style-guide`

- Documentation changes
  - Added remark regarding autogrow functionality to the `control` block.
- Refactoring
  - Refactored structure of the `autocomplete` block.
    - ATTENTION! This requires a markup change for the `autocomplete` block.
  - Renamed `single-file-upload` to `single-upload`
    - Renamed `single-upload__progress__icon-container` to `single-upload__status__icon-container`
    - ATTENTION! This requires a markup change for the `single-file-upload` block.
  - Renamed `multi-file-upload` to `multi-upload`
    - ATTENTION! This requires a markup change for the `multi-file-upload` block.
  - Renamed elements of the `segmented-control` block.
    - Renamed `segmented-control__radio` to `segmented-control__item__radio`
    - Renamed `segmented-control__label` to `segmented-control__item__label`
    - ATTENTION! This requires a markup change for the `segmented-control` block.
  - Renamed the `label` block to `tag`
    - ATTENTION! This requires a markup change for the `label` block.
  - Renamed the `table__item` and `table__item__row` elements to `table__row` and `table__row__item`
    - ATTENTION! This requires a markup change for the `table` block.
  - Moved the `footnote` block to the `form` block. It's renamed to `form__fotnote`
    - ATTENTION! This requires a markup change for the `footnote` block.
    
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
  - Autocomplete
    - Solved z-index issues [#200](https://github.com/axa-ch/style-guide/issues/200)
      - Introduced z-index-* variables in the `variables.less.lodash` file.
    - Add mouse over effect to autocomplete entries
  - Form
    - Vertical center form labels (in relation to a `control--input` block)
      - ATTENTION! This requires a markup change for the `form__group__label`!
  - Datepicker plugin
    - The datepicker plugin now emits the jQuery change event on the bound input field
      - ATTENTION! The change event is NOT a raw JS change event. It will be
        catched by jQuery listeners only.

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
