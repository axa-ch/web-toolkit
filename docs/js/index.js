/* global window, Intercom */

import $ from 'jquery'

window.jQuery = $
window.$ = $

import moment from 'moment'
import svg4everybody from 'svg4everybody'

require('../..')
require('./cheat')
require('./example')
require('./iframe-resizer')
require('./left-navigation')
require('./object-fit')
require('./octocat')
require('./search')
require('./tab')

moment.locale('en_GB')
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
