
head = ' \
<link rel="stylesheet" href="/css/normalize.min.css" />\
<link rel="stylesheet" href="/css/style.min.css" />\
<script type="text/javascript" src="/js/docs-examples.all.min.js"></script>\
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

    @$shadow = $ "<div style='position: absolute; top: -10000px;' ></div>"

    @$shadow.html html

    @$html.remove()
    @$el.append @$shadow

    @$contents.find("body").html html

    @setWidth null, @$devDesktop

  setWidth: (width, activeBtn) ->
    @$devMobile.removeClass 'is-active'
    @$devTablet.removeClass 'is-active'
    @$devDesktop.removeClass 'is-active'
    activeBtn.addClass 'is-active'

    w = if width == null then @$el.width() + 'px' else width

    @$shadow.css {
      width: w
    }

    h = parseInt(@$frame.css('padding-top'), 10) + parseInt(@$frame.css('padding-bottom'), 10) + @$shadow.find(".example").height() + 'px'

    @$frame.animate {
      width: w
      height: h
    }

$ () ->

  $(".example").each (i, el) ->
    new Example(el)
