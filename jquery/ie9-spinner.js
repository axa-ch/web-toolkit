import $ from 'jquery';

// Public class definition
class IE9Spinner {

  constructor(element, options) {
    this.$element = $(element);

    this.$element.addClass('is-fallback-active');
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let options = $.extend({}, data, typeof option === 'object' && option);
    if (typeof option === 'string') { let action = option; }

    let $this = $(this);
    var data = $this.data('axa.ie9Spinner');

    if (!data) {
      data = new IE9Spinner(this, options);
      return $this.data('axa.ie9Spinner', data);
    }
  });
};

// Plugin registration
$.fn.ie9Spinner = Plugin;
$.fn.ie9Spinner.Constructor = IE9Spinner;

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
  return $('[data-spinner]').each(function() {
    let $spinner = $(this);
    return Plugin.call($spinner);
  });
}
);

//! Copyright AXA Versicherungen AG 2015
