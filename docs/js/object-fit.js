/* global document */

if (!('objectFit' in document.documentElement.style)) {
  document.querySelector('html').className += ' no-objectfit'
}

$(() => {
  require('object-fit-polyfill')
})
