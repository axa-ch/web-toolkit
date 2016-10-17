import $ from 'jquery'

$(() => {
  const $nav = $('.nav')
  const $stroke = $('.nav-stroke')
  const nav = $nav[0]
  const stroke = $stroke[0]

  nav.addEventListener('mouseover', (event) => {
    const navItem = findNavItem(event.target)

    stroke.classList.toggle('is-visible', true)

    stroke.setAttribute('style', [
      `width: ${navItem.offsetWidth}px`,
      `-webkit-transform: translate(${navItem.offsetLeft}px, 0)`,
      `-ms-transform: translate(${navItem.offsetLeft}px, 0)`,
      `transform: translate(${navItem.offsetLeft}px, 0)`,
      `-webkit-transform: translate3d(${navItem.offsetLeft}px, 0, 0)`,
      `-ms-transform: translate3d(${navItem.offsetLeft}px, 0, 0)`,
      `transform: translate3d(${navItem.offsetLeft}px, 0, 0)`,
    ].join(';'))
  })

  nav.addEventListener('mouseout', () => {
    stroke.classList.toggle('is-visible', false)
  })

  function findNavItem(element) {
    let current = element

    while (!current.classList.contains('nav-item')
        && element.parentElement) {
      current = current.parentElement
    }

    return current
  }
})
