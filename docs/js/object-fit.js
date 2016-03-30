if ('objectFit' in document.documentElement.style === false) {
  document.querySelector('html').className += ' no-objectfit';
}

$(function () {
  require('object-fit-polyfill')
})
