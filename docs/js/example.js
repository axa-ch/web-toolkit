import $ from 'jquery';
import Bacon from 'baconjs';

// only one window size stream for all Example instances
let resizes = $(window)
  .asEventStream('resize');

class Example {
  constructor(el, options) {
    this.$el = $(el);
    this.init();
  }

  init() {
    this.$frame = this.$el.find('[data-example-iframe]');
    this.$mobile = this.$el.find('[data-example-mobile]');
    this.$tablet = this.$el.find('[data-example-tablet]');
    this.$desktop = this.$el.find('[data-example-desktop]');

    // store the availability of the viewports
    this.disableMobile = this.$el.attr('data-example-disable-mobile');
    this.disableTablet = this.$el.attr('data-example-disable-tablet');
    this.disableDesktop = this.$el.attr('data-example-disable-desktop');

    // we need both an initial resize and click
    let initialResize = Bacon.once(this.$el.width());
    let initialClick = Bacon.once(this.$el.width())
      .map(this.mapWidthToViewport)
      .map(this.mapToEnabledViewport(this.disableMobile, this.disableTablet, this.disableDesktop));

    // viewport that we explicitly switched to
    this.clickedTo = initialClick
      .merge(this.$mobile.asEventStream('click').map('mobile'))
      .merge(this.$tablet.asEventStream('click').map('tablet'))
      .merge(this.$desktop.asEventStream('click').map('desktop'))
      .skipDuplicates()
      .toProperty();

    // viewport that we sized our browser into
    this.resizedTo = resizes
      .map(() => this.$el.width())
      .merge(initialResize)
      .throttle(25)
      .map(this.mapWidthToViewport)
      .map(this.mapToEnabledViewport(this.disableMobile, this.disableTablet, this.disableDesktop))
      .skipDuplicates()
      .toProperty();

    // set viewport on resizing changes
    this.clickedTo
      .sampledBy(this.resizedTo, (resizedTo, clickedTo) => {
        let resizedToOrder = this.viewportToOrder(resizedTo);
        let clickedToOrder = this.viewportToOrder(clickedTo);
        if (clickedToOrder <= resizedToOrder) { return clickedTo; }
        return resizedTo;
      }
    )
      .onValue(viewport => {
        this.setMode(viewport);
        return this.setViewport(viewport);
      }
    );

    // set availability on resizing changes
    this.resizedTo
      .onValue(viewport => this.setModeAvailability(viewport));

    // set viewport on clicking changes
    return this.resizedTo
      .sampledBy(this.clickedTo, (clickedTo, resizedTo) => {
        let resizedToOrder = this.viewportToOrder(resizedTo);
        let clickedToOrder = this.viewportToOrder(clickedTo);
        if (clickedToOrder <= resizedToOrder) { return clickedTo; }
        return resizedTo;
      }
    )
      .onValue(viewport => {
        this.setMode(viewport);
        return this.setViewport(viewport);
      }
    );
  }

  mapWidthToViewport(width) {
    if (width < 768) { return 'mobile'; }
    if (width < 980) { return 'tablet'; }
    return 'desktop';
  }

  mapToEnabledViewport(disableMobile, disableTablet, disableDesktop) {
    return function(viewport) {
      if ((viewport === 'mobile' && !disableMobile) || (disableTablet && disableDesktop)) { return 'mobile'; }
      if ((viewport === 'tablet' && !disableTablet) || disableDesktop) { return 'tablet'; }
      return 'desktop';
    };
  }

  mapViewportToWidth(viewport) {
    if (viewport === 'mobile') { return '320px'; }
    if (viewport === 'tablet') { return '768px'; }
    return '100%';
  }

  viewportToOrder(viewport) {
    if (viewport === 'mobile') { return 0; }
    if (viewport === 'tablet') { return 1; }
    return 2;
  }

  setViewport(viewport) {
    return this.$frame.css('max-width', this.mapViewportToWidth(viewport));
  }

  setMode(viewport) {
    this.$mobile.toggleClass('is-active', viewport === 'mobile');
    this.$tablet.toggleClass('is-active', viewport === 'tablet');
    return this.$desktop.toggleClass('is-active', viewport === 'desktop');
  }

  setModeAvailability(maxViewport) {
    let maxViewportOrder = this.viewportToOrder(maxViewport);

    this.$mobile.toggleClass('is-available', !this.disableMobile && maxViewportOrder >= 0);
    this.$tablet.toggleClass('is-available', !this.disableTablet && maxViewportOrder >= 1);
    return this.$desktop.toggleClass('is-available', !this.disableDesktop && maxViewportOrder >= 2);
  }
}

$(() =>
  $('[data-example]')
    .each((i, el) => new Example(el))
);

//! Copyright AXA Versicherungen AG 2015
