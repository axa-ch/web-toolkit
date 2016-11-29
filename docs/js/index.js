/* global window */

import $ from 'jquery'
import svg4everybody from 'svg4everybody'
import Clipboard from 'clipboard'

import '../../js/index'

import './cheat'
import './example'
import './iframe-resizer'
import './object-fit'
import './search'
import './tab'

window.jQuery = $
window.$ = $

svg4everybody()

initMenu(window.__HREF) // eslint-disable-line no-underscore-dangle

// eslint-disable-next-line no-new
new Clipboard('[data-clipboard-target]')

function initMenu(href) {
  const mobile = $('[data-menu="collapsing"]')
  const upmost = mobile.find('[data-level]').first()

  const activeElement = mobile
    .find('[data-link]')
    .filter(`[href='${href}']`)

  if (activeElement.length > 0) {
    activeElement.toggleClass('is-active')
  }

  let level = activeElement
    .closest('[data-level]')

  if (level.length > 0) {
    level.toggleClass('is-active')
  } else {
    level = upmost
  }

  mobile.collapsingMenu('toggle', level)
}
