import $ from 'jquery'

const append = (html, $parent) => {
  const $el = $(html)
  $parent.append($el)
  return $el
}

export default append
