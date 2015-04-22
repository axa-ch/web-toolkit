(($) ->

  $(->
    $('.left-navigation__category').each (i, el) ->
      $el = $ el

      $headline = $el.find '.left-navigation__category__headline'
      $menu = $el.find '.left-navigation__category__menu'

      if not $menu.hasClass 'is-active'
        $menu.hide()

      $headline.on 'click', (e) ->
        e.preventDefault()

        $menu.slideToggle()
  )


)(jQuery)

#! Copyright AXA Versicherungen AG 2015
