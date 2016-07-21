import $ from 'jquery';

// Public class definition
class Spinner {
  constructor(element) {
    this.$element = $(element);
    this.$defaults = $('[data-default]');
    this.$fallbacks = $('[data-fallback]');

    this.fallback(true);
  }

  fallback(toggle) {
    this.$defaults.toggleClass('is-disabled', toggle);
    return this.$fallbacks.toggleClass('is-enabled', toggle);
  }
}

// Plugin definition
let Plugin = function(option) {
  return this.each(function() {
    if (typeof option === 'string') { var action = option; }

    let $this = $(this);
    let data = $this.data('axa.spinner');

    if (!data) {
      data = new Spinner(this);
      $this.data('axa.spinner', data);
    }

    if (action === 'fallback') {
      return data.fallback(arguments[1]);
    }
  });
};

// Plugin registration
$.fn.spinner = Plugin;
$.fn.spinner.Constructor = Spinner;

// DATA-API
$(window).on('load', function() {
  //check for support of the animation property
  let elm = document.createElement('div');
  let properties = [
    'animation',
    'WebkitAnimation',
    'MozAnimation',
    'msAnimation',
    'OAnimation'
  ];
  for (let i = 0; i < properties.length; i++) {
    let property = properties[i];
    if (elm.style[property] != null) {
      //if the animation property is supported, exit
      return;
    }
  }

  //animation property not supported, activate fallback on all spinners
  return $('[data-spinner="bouncy"]').each(function() {
    let $spinner = $(this);
    return Plugin.call($spinner);
  });
}
);

//! Copyright AXA Versicherungen AG 2015
