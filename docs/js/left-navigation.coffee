(($) ->

  $(->
    $('.left__menu .menu__level').each (i, el) ->
      $el = $ el

      $headline = $el.siblings '.menu__link'

      $headline.on 'click', (e) ->
        e.preventDefault()

        $headline.children('.menu__dropdown__icon').toggleClass 'is-open'
        $el.slideToggle 'fast', () ->
          $el.toggleClass 'is-open'
  )


)(jQuery)

#! Copyright AXA Versicherungen AG 2015
