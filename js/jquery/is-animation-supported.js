/* global document */

export default function isAnimationSupported() {
  // check for support of the animation property
  const elm = document.createElement('div')
  const properties = [
    'animation',
    'WebkitAnimation',
    'MozAnimation',
    'msAnimation',
    'OAnimation',
  ]
  const length = properties.length

  for (let i = 0; i < length; i++) {
    const property = properties[i]

    // if the animation property is supported, exit
    if (elm.style[property] !== undefined) {
      return true
    }
  }

  return false
}
