
head = ' \
<link rel="stylesheet" href="/css/style.css" />\
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
    @$devDesktop.on 'click', @setWidth.bind @, '100%', @$devDesktop

    contents = @$frame.contents();

    contents.find("head").html(head);

    html = @$html.html()

    if @$html.data('example-centered')
      html = '<div style="text-align: center;" ><div style="display: inline-block; text-align: left;" >' + html + '</div></div>'

    contents.find("body").html(html);

  setWidth: (width, activeBtn) ->
    @$devMobile.removeClass 'is-active'
    @$devTablet.removeClass 'is-active'
    @$devDesktop.removeClass 'is-active'
    activeBtn.addClass 'is-active'

    @$frame.animate {
      width: width
    }

$ () ->

  $(".example").each (i, el) ->
    new Example(el)
