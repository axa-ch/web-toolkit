import $ from 'jquery';

// Public class definition
class Autogrow {

  constructor(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, options);

    this.init();
  }

  init() {
    this.minHeight = this.$element.height();

    this.shadow = $('<div></div>');
    this.shadow.css({
      position: 'absolute',
      top: -10000,
      left: -10000,
      width: this.$element.width(),
      'font-size': this.$element.css('font-size'),
      'font-family': this.$element.css('font-family'),
      'font-weight': this.$element.css('font-weight'),
      'line-height': this.$element.css('line-height'),
      resize: 'none',
      'word-wrap': 'break-word'
    }
    );

    this.shadow.appendTo(document.body);

    this.$element.on('change keyup keydown', this, event => event.data.update(event)
    );

    return $(window).resize(this.update);
  }
  update(event) {
    ({
      times(string, number) {
        let r = '';
        while (num -= 1) {
          r += string;
        }
        return r;
      }
    });

    if (this.element) {
      let val = this.element.value.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;')
        .replace(/\n$/, '<br/>&nbsp;')
        .replace(/\n/g, '<br/>')
        .replace(/\s{2,}/g,space => times('&nbsp;', space.length - 1) + ' '
        );

      if ((event != null) && (event.data != null) && event.data.event === 'keydown' && event.keyCode === 13) {
        val += '<br />';
      }

      this.shadow.css('width', this.$element.width());
      this.shadow.html(val);

      let newHeight = Math.max(this.shadow.height(), this.minHeight);

      return this.$element.height(newHeight);
    }
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let $this = $(this);
    let data = $this.data('axa.autogrow');

    if (!data) {
      data = new Autogrow(this);
      return $this.data('axa.autogrow', data);
    }
  });
};

// Plugin registration
$.fn.autogrow = Plugin;
$.fn.autogrow.Constructor = Autogrow;

// DATA-API
$(window).on('load', () =>
  $('[data-autogrow="autogrow"]').each(function() {
    let $autogrow = $(this);
    return Plugin.call($autogrow);
  })

);

//! Copyright AXA Versicherungen AG 2015
