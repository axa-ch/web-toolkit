import $ from 'jquery'
import ZeroClipboard from 'zeroclipboard'

ZeroClipboard.config({ swfPath: '../../ZeroClipboard.swf' })

$(() => {
  const clipboards = $('[data-clipboard-text]')

  if (clipboards.length) {
    const client = new ZeroClipboard(clipboards)

    client.on('ready', function (event) {
      client.on('aftercopy', function (event) {
        $('#notification').notification({
          html: true,
          content: `<strong>${event.data['text/plain']}</strong> copied to clipboard`,
          modifier: 'success',
        })
      })
    })

    client.on('error', function (event) {
      console.log(event)
    })
  }
})
