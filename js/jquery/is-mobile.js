/* global navigator */

const isMobile = navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/(iOS|iPhone|iPad|iPod)/i) ||
  navigator.userAgent.match(/Windows Phone/i)

export default isMobile
