(($) ->

  class NotificationPane

    constructor: (element, options) ->
      @$element = $(element)

    displayNotification: (notification) ->

      if !notification?
        return

      $notification = $ '<div class="notifications__item" ></div>'
      $notification.on 'click', ->
        @hideNotification $notification

      if notification.html == true
        $notification.html notification.content
      else
        $notification.text notification.content

      if notification.modifier
        $notification.addClass 'notifications__item--'+notification.modifier

      timeout = 2000

      if typeof notification.timeout == "number"
        timeout = notification.timeout

      setTimeout (=>
        @hideNotification $notification
      ), timeout

      @$element.append $notification

    hideNotification: ($notification) ->
      $notification.addClass 'notifications__item--fade-out'
      setTimeout (->
        $notification.remove()
      ), 500

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $(this)
      data = $this.data('axa.notification')

      if not data
        data = new NotificationPane(this)
        $this.data('axa.notification', data)

      if typeof option == 'object'
        data.displayNotification option

      if typeof option == 'string'
        data.displayNotification {
          content: option
        }

  # Plugin registration
  $.fn.notification = Plugin
  $.fn.notification.Constructor = NotificationPane

  # DATA-API
  $(document).on 'click.axa.notification.data-api', '[data-notification]', (e) ->
    e.preventDefault()

    $this = $ this

    $target = $ $this.data('notification')

    Plugin.call $target, {
      content: $this.data('notification-content')
      modifier: $this.data('notification-modifier')
    }

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
