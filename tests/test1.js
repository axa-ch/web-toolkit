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

// var PAGE_WIDTH = 960;
// var PAGE_HEIGHT = 640;

// // phantomjs page object and helper flag
// var page = require('webpage').create(),
//   loadInProgress = false,
//   pageIndex = 0;


// // set clip and viewport based on PAGE_WIDTH and PAGE_HEIGHT constants
// if (PAGE_WIDTH > 0 && PAGE_HEIGHT > 0) {
//   page.viewportSize = {
//     width: PAGE_WIDTH,
//     height: PAGE_HEIGHT
//   };

//   page.clipRect = {
//     top: 0,
//     left: 0,
//     width: PAGE_WIDTH,
//     height: PAGE_HEIGHT
//   };
// }

// // page handlers
// page.onLoadStarted = function() {
//   loadInProgress = true;
//   console.log('page ' + (pageIndex + 1) + ' load started');
// };

// page.onLoadFinished = function() {
//   loadInProgress = false;
//   page.render('screenshots' + demo + '_' + PAGE_WIDTH + 'x' + PAGE_HEIGHT + '.png');
//   console.log('page ' + (pageIndex + 1) + ' load finished');
//   pageIndex++;
// };

// // try to load or process a new page every 250ms
// setInterval(function() {
//   if (!loadInProgress && pageIndex < demos.length) {
//     console.log('image ' + (pageIndex + 1));
//     page.open('http://192.168.99.100:3000' + demos[pageIndex] + '.html');
//   }
//   if (pageIndex == demos.length) {
//     console.log('image render complete!');
//     phantom.exit();
//   }
// }, 250);

// console.log('Number of URLS: ' + demos.length);


function openPage(index) {
  var demo = demos[index];
  var page = require('webpage').create();
  console.log('Opening page ', demo)
  page.open(baseUrl + demo + '.html', function(status) {
    console.log('Rendering page ', demo)
    page.render('screenshots' + demo + '.png');

    if (status && index+1 < demos.length) {
      //Do a timeout of 100ms because shit gets fucked up otherwise
      setTimeout(function () {
        openPage(index + 1)
      }, 100) 
    } else {
      phantom.exit(1)
    }
  });
}

openPage(0);
