import $ from 'jquery'

require('../..')
require('./cheat')
require('./example')
require('./iframe-resizer')
require('./left-navigation')
require('./octocat')
require('./search')
require('./tab')

import moment from 'moment'

moment.locale('en_GB')

$('#showNotification').on('click', function () {
  let content = $('#notification_content').val()
  let modifier = $('[name="notification__modifier"]:checked').val()
  let isHtml = $('#notification_html').is(':checked')

  $('#notification').notification({
    content: content,
    modifier: modifier,
    html: isHtml
  })
})
