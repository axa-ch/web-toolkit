import $ from 'jquery'

$(() => {
  const $search = $('[data-srch]')
  const $input = $('[data-srch-input]')
  const $fade = $('[data-srch-fade]')

  $input.on('focus', (event) => {
    $fade.toggleClass('fade-out', true)
    $fade.toggleClass('fade-in-delayed', false)
    $search.toggleClass('is-open', true)
  })

  $input.on('blur', (event) => {
    $fade.toggleClass('fade-in-delayed', true)
    $fade.toggleClass('fade-out', false)
    $search.toggleClass('is-open', false)
  })

  $search.submit((event) => {
    console.log('HELLO SEARCH')
    if (!$search.hasClass('is-open')) {
      event.preventDefault()
      $input.focus()
      return false
    }
  })
})
