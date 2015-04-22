(($) ->

  class Modal

    constructor: (element, options) ->
      @$element = $(element)

    toggle: () ->

      if @$element.hasClass 'is-active'
        @$element.removeClass 'is-active'
        $('body').removeClass 'is-modal-open'
      else
        @$element.addClass 'is-active'
        $('body').addClass 'is-modal-open'

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $(this)
      data = $this.data('axa.modal')

      if not data
        data = new Modal(this)
        $this.data('axa.modal', data)

      if typeof option == 'string'
        data[option]()

  # Plugin registration
  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal

  # DATA-API
  $(document).on 'click.axa.modal.data-api', '[data-modal]', (e) ->
    e.preventDefault()

    $target = $ $(e.currentTarget).data('modal')

    Plugin.call($target, 'toggle')

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
