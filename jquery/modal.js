import $ from 'jquery';

class Modal {

  constructor(element, options) {
    this.$element = $(element);
  }

  toggle() {

    if (this.$element.hasClass('is-active')) {
      this.$element.removeClass('is-active');
      return $('body').removeClass('is-modal-open');
    } else {
      this.$element.addClass('is-active');
      return $('body').addClass('is-modal-open');
    }
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let $this = $(this);
    let data = $this.data('axa.modal');

    if (!data) {
      data = new Modal(this);
      $this.data('axa.modal', data);
    }

    if (typeof option === 'string') {
      return data[option]();
    }
  });
};

// Plugin registration
$.fn.modal = Plugin;
$.fn.modal.Constructor = Modal;

// DATA-API
$(document).on('click.axa.modal.data-api', '[data-modal]', function(e) {
  e.preventDefault();

  let $target = $($(e.currentTarget).data('modal'));

  return Plugin.call($target, 'toggle');
}
);

//! Copyright AXA Versicherungen AG 2015
