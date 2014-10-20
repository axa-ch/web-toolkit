(($) ->

  class Tab

    constructor: (element, options) ->
      @$element = $(element)
      @$tabPanelHeader = @$element.parent().closest('.tab-panel__header')

      selector = @$element.data 'target'

      if not selector
        selector = @$element.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')


      @$target = $(selector)

    show: () ->

      return if @$element.hasClass('is-active')

      previous = @$tabPanelHeader.find('.is-active:last')
      # TODO: Bootstrap triggers event here, should we do the same?

      @activate @$element, @$tabPanelHeader
      @activate @$target, @$target.parent().closest('.tab-panel__content')

    activate: ($element, $container) ->
      $active = $container.find('.is-active').not($container.find('.tab-panel .is-active'))

      $active.removeClass('is-active')

      $element.addClass('is-active')

  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      $this = $(this)
      data = $this.data('axa.tab')

      if not data
        data = new Tab(this)
        $this.data('axa.tab', data)

      if typeof option == 'string'
        data[option]()

  # Plugin registration
  $.fn.tab = Plugin
  $.fn.tab.Constructor = Tab

  # DATA-API
  $(document).on 'click.axa.tab.data-api', '[data-toggle="tab"]', (e) ->
    e.preventDefault()
    Plugin.call($(this), 'show')

)(jQuery)
