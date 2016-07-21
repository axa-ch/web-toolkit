import $ from 'jquery';

// Public class definition
class Autocomplete {

  constructor(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, options);
    this.filtered = this.options.source;
    if (this.filtered == null) { this.filtered = []; }
    this.value = '';
    this.isMouseOver = false;

    this.$dropdown = $('<div class="autocomplete__suggestions"></div>');
    this.$dropdown.hide();
    this.$element.after(this.$dropdown);

    this.$element.on('keyup', this, event => event.data.filter(event)
    );

    this.$element.on('blur', this, function(event) {
      if (!event.data.isMouseOver) {
        return event.data.$dropdown.hide();
      }
    }
    );
  }

  filter(event) {
    if (this.value !== this.element.value) {
      this.value = this.element.value;
      this.filtered = (this.options.source.filter((text) => text.indexOf(this.value) > -1).map((text) => text));
      this.$dropdown.empty();
      for (let i = 0; i < this.filtered.length; i++) {
        let text = this.filtered[i];
        this.$dropdown.append(this.createItem(text));
      }
      return this.$dropdown.show();
    }
  }

  createItem(text) {
    let item = $(`<div class="autocomplete__suggestions__item">${text}</div>`);
    item.on('mouseover', this, function(event) {
      event.data.isMouseOver = true;
      return $(event.target).addClass('autocomplete__suggestions__item--selected');
    }
    );
    item.on('mouseout', this, function(event) {
      event.data.isMouseOver = false;
      return $(event.target).removeClass('autocomplete__suggestions__item--selected');
    }
    );
    item.on('click', this, event => event.data.selectItem(event)
    );

    return item;
  }

  selectItem(event) {
    this.element.value = event.target.textContent;
    return this.$dropdown.hide();
  }
}


// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let options = $.extend({}, data, typeof option === 'object' && option);
    let $this = $(this);
    var data = $this.data('axa.autocomplete');

    if (!data) {
      data = new Autocomplete(this, options);
      return $this.data('axa.autocomplete', data);
    }
  });
};

// Plugin registration
$.fn.autocomplete = Plugin;
$.fn.autocomplete.Constructor = Autocomplete;

// DATA-API
$(window).on('load', () =>
  $('[data-autocomplete]').each(function() {
    let $autocomplete = $(this);
    return Plugin.call($autocomplete);
  })

);

//! Copyright AXA Versicherungen AG 2015
