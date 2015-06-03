
head = ' \
<link rel="stylesheet" href="http://fast.fonts.net/cssapi/1da4c08a-73a4-4e34-8997-1c1eeb1a8cca.css">\
<link rel="stylesheet" href="/css/normalize.min.css" />\
<link rel="stylesheet" href="/css/style.min.css" />\
'

class Example

  constructor: (el) ->
    @$el = $ el

    @$html = @$el.find '.example__html'
    @$frame = @$el.find '.example__iframe'

    @$devMobile = @$el.find '.example__device-selection__device--mobile'
    @$devTablet = @$el.find '.example__device-selection__device--tablet'
    @$devDesktop = @$el.find '.example__device-selection__device--desktop'

    @$devMobile.on 'click', @setWidth.bind @, '320px', @$devMobile
    @$devTablet.on 'click', @setWidth.bind @, '768px', @$devTablet
    @$devDesktop.on 'click', @setWidth.bind @, null, @$devDesktop

    @$contents = @$frame.contents()

    @$contents.find("head").html head

    html = @$html.html()

    if @$html.data 'example-centered'
      html = '<div style="text-align: center;" class="example" ><div style="display: inline-block; text-align: left;" >' + html + '</div></div>'
    else
      html = '<div class="example" >' + html + '</div>'

    @$html.remove()

    @exampleScript = @$contents[0].createElement('script')
    @exampleScript.type = 'text/javascript'
    @exampleScript.src = '/js/docs-examples.all.min.js'
    
    @$contents.find("body").html html
    @$contents.find("head")[0].appendChild @exampleScript
    
    @setWidth null, @$devDesktop

    setTimeout ( =>
      iFrame = @$frame[0]
      iFrameResize {
        autoResize: true
        resizeFrom: 'child'
        checkOrigin: false
        sizeHeight: true
        heightCalculationMethod: 'lowestElementOnly'
      }, iFrame), 500
      

  setWidth: (width, activeBtn) ->
    @$devMobile.removeClass 'is-active'
    @$devTablet.removeClass 'is-active'
    @$devDesktop.removeClass 'is-active'
    activeBtn.addClass 'is-active'

    w = if width == null then @$el.width() + 'px' else width
    
    @$frame.animate {
      width: w
    }



$ () ->

  $(".example").each (i, el) ->
    new Example(el)
