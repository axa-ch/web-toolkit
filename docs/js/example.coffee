#--------------------------------------
# > Abandon all hope, you who enter here.
# Not anymore! :)
#--------------------------------------

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

    @maxHeight = @$el.data 'example-max-height'
    if not @maxHeight?
      @maxHeight = 'infinity'

    @setWidth null, @$devDesktop

    iFrame = @$frame[0]
    iFrameResize {
      autoResize: true
      resizeFrom: 'child'
      checkOrigin: false
      sizeHeight: true
      maxHeight: @maxHeight
      heightCalculationMethod: 'lowestElement'
    }, iFrame

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
