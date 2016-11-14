/* global window, Intercom */

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

$('#showNotification').on('click', () => {
  const content = $('#notification_content').val()
  const modifier = $('[name="notification__modifier"]:checked').val()
  const isHtml = $('#notification_html').is(':checked')

  $('#notification').notification({
    content,
    modifier,
    html: isHtml,
  })
})

$('#cities-autocomplete').autocomplete({
  source: ['8000 Zürich', '8400 Winterthur', '8472 Seuzach'],
})

$('[data-subscribe]').submit((e) => {
  e.preventDefault()
  const email = $('[data-email]').val()
  Intercom('showNewMessage', `Hi there,\n\nPlease keep me updated on ${email}!\n\nRegards.`)
  $('.intercom-composer-send-button').click()
})

$('[data-chat]').click((e) => {
  e.preventDefault()
  Intercom('show')
})

// eslint-disable-next-line no-new
new Clipboard('.btn')
