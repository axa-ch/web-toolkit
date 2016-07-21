import extend from 'extend'
import base from './marked-renderer'

const renderer = {}

/* eslint-disable no-underscore-dangle */
renderer.heading = (text, level) => {
  const slug = this._slugify(text)
  const l = 1 + parseInt(level, 10)
  const classes = []

  if (l === 2) {
    classes.push('heading', 'heading--secondary')
    classes.push('changelog__timeline__item__content__headline')
  }
  if (l === 3) {
    classes.push('heading', 'heading--tertiary')
  }

  const joinedClasses = classes.join(' ')

  return `<h${l} id="${slug}" class="${joinedClasses}">
      ${text}
    </h${l}>`
}

renderer.paragraph = text => `<p class="paragraph changelog__timeline__item__content__text">${text}</p>`

renderer.list = (body, ordered) => {
  const type = ordered ? 'ol' : 'ul'
  const cls = ordered ? 'ordered' : 'unordered'

  return `<${type} class="list list--${cls} changelog__timeline__item__content__list">
      ${body}
    </${type}>`
}

renderer.listitem = text =>
  `<li class="list__item changelog__timeline__item__content__list__item">
    ${text}
  </li>`

export default extend({}, base, renderer)

//! Copyright AXA Versicherungen AG 2015
