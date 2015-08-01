class Example

  constructor: (el) ->
    @$el = $ el

    @$frame = @$el.find '.example__iframe'

    @$devMobile = @$el.find '.example__device-selection__mobile'
    @$devTablet = @$el.find '.example__device-selection__tablet'
    @$devDesktop = @$el.find '.example__device-selection__desktop'

    @$devMobile.on 'click', @setWidth.bind @, '320px', @$devMobile
    @$devTablet.on 'click', @setWidth.bind @, '768px', @$devTablet
    @$devDesktop.on 'click', @setWidth.bind @, null, @$devDesktop

    border = @$el.find '.example__border'
    @borderPadding = parseInt(border.css('padding-left')) +
      parseInt(border.css('padding-right'))

    @setWidth null, @$devDesktop

  setWidth: (width, activeBtn) ->
    @$devMobile.removeClass 'is-active'
    @$devTablet.removeClass 'is-active'
    @$devDesktop.removeClass 'is-active'
    activeBtn.addClass 'is-active'

    w = if width == null then @$el.width() - @borderPadding + 'px' else width
    @$frame.animate {
      width: w
    }

$ ->
  $(".example").each (i, el) ->
    new Example(el)
