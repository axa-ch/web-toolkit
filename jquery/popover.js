import $ from 'jquery';

// Public class definition
class Popover {
  constructor(element, options) {
    this.position = this.position.bind(this);
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, options);

    this.$target = $(this.$element.data('popover'));
    this.$closeIcon = this.$target.find('.popover__close');

    this.isOpen = false;

    this.$element.on('click', this, this.toggle);
    this.$closeIcon.on('click', this, this.toggle);

    this.position();

    $(window).on('resize', this.position);
  }

  toggle(event) {
    event.data.isOpen = !event.data.isOpen;
    event.data.position();
    return event.data.$target.toggleClass('is-active');
  }

  position() {
    let $box = this.$target.find('.popover__box');
    let $tail = this.$target.find('.popover__tail');

    //todo proper workaround for ie9
    let isSmall = false;
    if (window.matchMedia != null) { //not supported by IE9
      isSmall = !window.matchMedia('(min-width: 768px)').matches;
    } else { //this makes it kinda work in IE9
      isSmall = $(window).outerWidth() < 768;
    }

    if (isSmall) {
      if (this.isOpen) {
        $('body').addClass('is-modal-open');
      } else {
        $('body').removeClass('is-modal-open');
      }

      return $box.css({ top: 0, left: 0 });
    } else {
      $('body').removeClass('is-modal-open');
      //box
      let maxOffsetTop = $(document).height() - $box.outerHeight();
      let maxOffsetLeft = $(document).width() - $box.outerWidth() - 20;

      let offset = { top: 0, left: 0 };
      offset.top = this.$element.offset().top + this.$element.outerHeight() + 20;
      offset.left = this.$element.offset().left;

      if (offset.left > maxOffsetLeft) {
        offset.left = maxOffsetLeft;
      }

      //tail
      $tail.removeClass('popover__tail--top popover__tail--bottom');
      let tailOffset = { top: 0, left: 0 };
      tailOffset.top = (this.$element.offset().top + this.$element.outerHeight()) - 20;
      tailOffset.left = (this.$element.offset().left + (this.$element.outerWidth() / 2)) - 20;
      let tailClass = 'popover__tail--top';

      //position above if not enough space below
      if (offset.top > maxOffsetTop) {
        offset.top = this.$element.offset().top - $box.outerHeight() - 20;
        tailOffset.top = this.$element.offset().top - 20;
        tailClass = 'popover__tail--bottom';
      }

      $box.offset(offset);
      $tail.addClass(tailClass);
      return $tail.offset(tailOffset);
    }
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let options = $.extend({}, data, typeof option === 'object' && option);
    let $this = $(this);
    var data = $this.data('axa.popover');

    if (!data) {
      data = new Popover(this, options);
      return $this.data('axa.popover', data);
    }
  });
};

// Plugin registration
$.fn.popover = Plugin;
$.fn.popover.Constructor = Popover;

// DATA-API
$(window).on('load', () =>
  $('[data-popover]').each(function() {
    let $popover = $(this);

    return Plugin.call($popover);
  })

);

//! Copyright AXA Versicherungen AG 2015
