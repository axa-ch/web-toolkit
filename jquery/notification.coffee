(($) ->

  class NotificationPane

    constructor: (element, options) ->
      @$element = $ element
      console.log @$element
      @path = {
        info: @$element.data 'notification-info'
        success: @$element.data 'notification-success'
        error: @$element.data 'notification-error'
      }
      #@path.info = @$element.data 'notification-info'
      #@path.success = @$element.data 'notification-success'
      #@path.error = @$element.data 'notification-error'

    displayNotification: (notification) ->

      if !notification?
        return


      $notification = $ '<div class="notifications__item" ></div>'
      $icon = null

      if notification.modifier
        console.log notification.modifier
        console.log @path
        console.log @path[notification.modifier]
        $notification.addClass 'notifications__item--'+notification.modifier
        $icon = '<svg class="icon-svg notifications__item__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + @path[notification.modifier] + '"></use></svg>'
        console.log $icon

      $iconContainer = $ '<div class="notifications__item__icon-container">'

      $iconContainer.append $icon
      $notification.append $iconContainer

      $notification.on 'click', ->
        @hideNotification $notification

      $content = $ '<div class="notifications__item__content"></div>'
      if notification.html == true
        $content.html notification.content
      else
        $content.text notification.content

      $notification.append $content

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
