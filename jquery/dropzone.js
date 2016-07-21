import $ from 'jquery';

// Public class definition
class Dropzone {

  constructor(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, options);

    this.init();
  }

  init() {
    this.$element.bind('dragover', this, function(event) {
      event.preventDefault();
      return event.data.$element.addClass('dropzone__container--dragover');
    }
    );

    this.$element.bind('dragleave', this, function(event) {
      event.preventDefault();
      return event.data.$element.removeClass('dropzone__container--dragover');
    }
    );

    return this.$element.on('drop', this, function(event) {
      event.preventDefault();
      return event.data.$element.removeClass('dropzone__container--dragover');
    }
    );
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let $this = $(this);
    let data = $this.data('axa.dropzone');

    if (!data) {
      data = new Dropzone(this);
      return $this.data('axa.dropzone', data);
    }
  });
};

// Plugin registration
$.fn.dropzone = Plugin;
$.fn.dropzone.Constructor = Dropzone;

// DATA-API
$(window).on('load', () =>
  $('[data-dropzone="dropzone"]').each(function() {
    let $dropzone = $(this);
    return Plugin.call($dropzone);
  })

);

//! Copyright AXA Versicherungen AG 2015
