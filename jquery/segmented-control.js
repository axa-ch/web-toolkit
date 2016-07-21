import $ from 'jquery';

// Public class definition
class SegmentedControl {
  static DEFAULTS

  constructor(element, options) {
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setRadioState = this.setRadioState.bind(this);
    this.$element = $(element);
    let disabled = this.$element.is('[disabled=disabled]');

    // TODO: Do not depend on css classes
    this.$radios = this.$element.find('.segmented-control__item__radio');

    this.$radios.each(function(index, element) {
      let $radio = $(element);
      if (disabled) { $radio.prop('disabled', 'disabled'); }
      return $radio.data('item.element', $radio.closest('.segmented-control__item'));
    });

    this.options = $.extend({}, SegmentedControl.DEFAULTS, options);

    this.init();
  }

  init() {
    this.$radios.prop('tabindex', '-1');
    this.$element.prop('tabindex', '0');

    this.$element.addClass('segmented-control--js');

    this.setRadioState();

    this.$radios.on('change', this.setRadioState);

    this.$element.on('keyup', this.handleKeyUp);

    this.$element.on('keydown', this.handleKeyDown);

    this.stackControlsIfNeeded();

    return $('window').on('resize', this.stackControlsIfNeeded);
  }

  stackControlsIfNeeded() {
    this.$element.removeClass('segmented-control--stacked');

    if (this.$element.outerWidth() >= this.$element.parent().innerWidth()) {
      return this.$element.addClass('segmented-control--stacked');
    }
  }

  // Spacewar will activate first item if none is active
  handleKeyUp(e) {
    if (e.which === 32) {
      e.preventDefault();
      if (this.$radios.filter(':checked').length === 0) {
        let $first = $(this.$radios[0]);
        $first.prop('checked', true);
        return $first.change();
      }
    }
  }

  // Arrows will activate the next/previous radio
  handleKeyDown(e) {
    switch (e.which) {
      // prevent scrolling
      case 32:
        return e.preventDefault();
      // left / up
      case 37: case 38:
      e.preventDefault();

      let $checked = $(this.$radios.filter(':checked'));

      if ($checked.length !== 0) {
        let $previous = $(this.$radios[this.$radios.index($checked) - 1]);

        if (($previous != null) && $previous.length !== 0) {
          $previous.prop('checked', true);
          return $previous.change();
        }
      }

      // right / down
      case 39: case 40:
      e.preventDefault();

      $checked = $(this.$radios.filter(':checked'));

      // check second radio when none is checked
      if ($checked.length === 0) {
        let $first = $(this.$radios[1]);

        if (($first != null) & $first.length !== 0) {
          $first.prop('checked', true);
          return $first.change();
        }

      } else {
        let $next = $(this.$radios[this.$radios.index($checked) + 1]);

        if (($next != null) && $next.length !== 0) {
          $next.prop('checked', true);
          return $next.change();
        }
      }
    }
  }


  setRadioState() {

    return this.$radios.each(function(index, element) {

      let $radio = $(element);
      let $item = $radio.data('item.element');

      if ($radio.is(':checked')) {
        return $item.addClass('is-active');
      } else {
        return $item.removeClass('is-active');
      }
    });
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let $this = $(this);
    let options = $.extend({}, SegmentedControl.DEFAULTS, data, typeof option === 'object' && option);
    var data = $this.data('axa.segmentedControl');

    if (!data) {
      data = new SegmentedControl(this, options);
      return $this.data('axa.segmentedControl', data);
    }
  });
};

// Plugin registration
$.fn.segmentedControl = Plugin;
$.fn.segmentedControl.Constructor = SegmentedControl;

// DATA-API
$(window).on('load', () =>
  $('[data-segmented-control]').each(function() {
    let $segmentedControl = $(this);
    let data = $segmentedControl.data();

    return Plugin.call($segmentedControl, data);
  })

);

//! Copyright AXA Versicherungen AG 2015
