class Example

  constructor: (el) ->
    @$el = $ el

    @$frame = @$el.find '[data-example-iframe]'

    @triggers = {}
    @triggers.$mobile = @$el.find '[data-example-mobile]'
    @triggers.$tablet = @$el.find '[data-example-tablet]'
    @triggers.$desktop = @$el.find '[data-example-desktop]'

    @triggers.$mobile.on 'click', @setWidth.bind @, '320px', @triggers.$mobile
    @triggers.$tablet.on 'click', @setWidth.bind @, '768px', @triggers.$tablet
    @triggers.$desktop.on 'click', @setWidth.bind @, null, @triggers.$desktop

    border = @$el.find '[data-example-border]'
    @padding =
      (parseInt border.css 'padding-left') +
      (parseInt border.css 'padding-right')

    @setWidth null, @triggers.$desktop

  setWidth: (width, $trigger) ->
    $.each @triggers, (i, $t) ->
      $t.toggleClass 'is-active', $t.is $trigger

    w = if width == null then @$el.width() - @padding + 'px' else width
    @$frame.animate
      width: w

$ ->
  $ '[data-example]'
    .each (i, el) ->
      new Example el

#! Copyright AXA Versicherungen AG 2015
