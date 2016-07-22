import $ from 'jquery'

$(() =>
  $('.left__menu .menu__level').each((i, el) => {
    const $el = $(el)
    const $headline = $el.siblings('.menu__link')

    return $headline.on('click', (e) => {
      e.preventDefault()

      $headline
        .children('.menu__dropdown__icon')
        .toggleClass('is-open')

      return $el.slideToggle('fast', () => $el.toggleClass('is-open'))
    })
  })
)

//! Copyright AXA Versicherungen AG 2015
