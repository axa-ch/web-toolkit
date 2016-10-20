var webpage = require('webpage');
var fs = require('fs');

var demos = [
  '/components/demos/badge',
  '/components/demos/bouncing-spinner',
  '/components/demos/button-floating',
  '/components/demos/button-ghost',
  '/components/demos/button-more',
  '/components/demos/button-primary',
  '/components/demos/button-secondary',
  '/components/demos/dialog',
  '/components/demos/footer-full',
  '/components/demos/footer-slim',
  '/components/demos/footer',
  '/components/demos/grid-quick-start',
  '/components/demos/header',
  '/components/demos/header2',
  '/components/demos/icon-teaser',
  '/components/demos/loading-spinner',
  '/components/demos/long-words-automatic-word-breaking',
  '/components/demos/long-words-overflow-ellipsis',
  '/components/demos/main-menu-basic',
  '/components/demos/main-menu-multi',
  '/components/demos/mobile-menu-collapsing',
  '/components/demos/mobile-menu-sliding',
  '/components/demos/mobile',
  '/components/demos/modal',
  '/components/demos/modal2-ajax',
  '/components/demos/modal2-static',
  '/components/demos/notification',
  '/components/demos/popover',
  '/components/demos/progressbar',
  '/components/demos/richtext',
  '/components/demos/site-desktop',
  '/components/demos/site-fixed',
  '/components/demos/site-left',
  '/components/demos/site-stacked',
  '/components/demos/site',
  '/components/demos/typography'
];

var baseUrl = 'http://192.168.99.100:3000';
baseUrl = 'http://localhost:3000';

var delay = 10;
var mobileViewport = { width: 375, height: 200 }
var tabletViewport = { width: 900, height: 200 }
var desktopViewport = { width: 1400, height: 400 }

var viewports = [
  mobileViewport,
  tabletViewport,
  desktopViewport
]

function openPage(index) {
  var demo = demos[index];
  var page = webpage.create();

  page.viewportSize = viewports[0];
  
  page.settings.localToRemoteUrlAccessEnabled = true

  console.log('Opening page ', demo)
  page.open(baseUrl + demo + '.html', function(status) {
    function renderViewport(viewportIndex) {
      if (page.viewports !== viewports[viewportIndex])
      {
        page.viewportSize = viewports[viewportIndex];
        page.reload();
      }
      var filename = 'screenshots' + demo + '_' + page.viewportSize.width + 'x' + page.viewportSize.height + '.png';
      console.log('Rendering page ', demo);
      page.render(filename);

      if (!fs.exists(filename)) {
        console.log('file', filename, 'has not been correctly rendered. Waiting', delay, 'ms and retrying.');
        setTimeout(function() {
          renderViewport(viewportIndex);
        }, delay);
        return;
      }
      console.log('file', filename, 'exists. Proceeding with next file.');

      if (viewportIndex < viewports.length-1) {
        renderViewport(viewportIndex + 1)
      }
      else {
        page.close();
        if (index + 1 < demos.length) {
          openPage(index + 1);
        }
        else {
          phantom.exit(0);
        }
      }
    }

    renderViewport(0);
  });
}

openPage(0);
