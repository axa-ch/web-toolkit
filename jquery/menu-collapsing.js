import $ from 'jquery';

// Public class definition
class CollapsingMenu {
  static DEFAULTS =
    {exclusive: false};

  constructor(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, CollapsingMenu.DEFAULTS, options);

    this.init();
  }

  init() {
    return this.$element.on('click', '[data-link]', this, function(event) {
      let link = $(event.target);
      let subLevel = link.siblings('[data-level]');

      if (subLevel.length > 0) {
        event.preventDefault();
        return event.data.toggle(subLevel);
      }
    }
    );
  }

  toggle(toSet) {
    let level = this.$element.find(toSet);

    if (!level) { throw new Error('Provided level not in menu!'); }

    let parentLinks = level.parentsUntil(this.$element, '[data-link]');
    let parentLevels = level.parentsUntil(this.$element, '[data-level]');

    let shouldOpen = !level.hasClass('is-open');

    if (shouldOpen && this.options.exclusive) {
      this.$element.find('[data-level]').not(parentLevels)
        .removeClass('is-open')
        .siblings('[data-link]').removeClass('is-active');
    }

    return level.toggleClass('is-open', shouldOpen)
      .siblings('[data-link]').toggleClass('is-active', shouldOpen);
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let $this = $(this);
    let options = $.extend({}, CollapsingMenu.DEFAULTS, data, typeof option === 'object' && option);
    if (typeof option === 'string') { var action = option; }
    var data = $this.data('axa.menu');

    if (!data) {
      data = new CollapsingMenu(this, options);
      $this.data('axa.menu', data);
    }

    if (action === 'toggle') {
      return data.toggle(params[1]);
    }
  });
};

// Plugin registration
$.fn.collapsingMenu = Plugin;
$.fn.collapsingMenu.Constructor = CollapsingMenu;

// DATA-API
$(window).on('load', () =>
  $('[data-menu="collapsing"]').each(function() {
    let $menu = $(this);
    let data = $menu.data();

    return Plugin.call($menu, data);
  })

);

//! Copyright AXA Versicherungen AG 2015
