import $ from 'jquery';

// Public class definition
class Info {

  constructor(element, options) {
    this.$element = $(element);
    // @options = $.extend {}, options

    let selector = this.$element.data('target');
    if (selector == null) { selector = options.target; }

    this.$target = $(selector);

    this.$element.on('click', this, event => event.data.toggle(event)
    );
  }

  toggle() {
    this.$target.slideToggle();
    return this.$element.toggleClass('is-active');
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let options = $.extend({}, data, typeof option === 'object' && option);
    if (typeof option === 'string') { let action = option; }

    let $this = $(this);
    var data = $this.data('axa.info');

    if (!data) {
      data = new Info(this, options);
      return $this.data('axa.info', data);
    }
  });
};

// Plugin registration
$.fn.info = Plugin;
$.fn.info.Constructor = Info;

// DATA-API
$(window).on('load', () =>
  $('[data-info]').each(function() {
    let $info = $(this);
    return Plugin.call($info);
  })

);

//! Copyright AXA Versicherungen AG 2015
