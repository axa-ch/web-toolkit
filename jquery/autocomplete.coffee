(($) ->

  # Public class definition
  class Autocomplete

    constructor: (element, options) ->
      @element = element
      @$element = $ element
      @options = $.extend {}, options
      @filtered = @options.source
      @filtered = [] if not @filtered?
      @value = ''
      @isMouseOver = false

      @$dropdown = $ '<div class="autocomplete__suggestions"></div>'
      @$dropdown.hide()
      @$element.after @$dropdown

      @$element.on 'keyup', @, (event) ->
        event.data.filter(event)

      @$element.on 'blur', @, (event) ->
        if not event.data.isMouseOver
          event.data.$dropdown.hide()

    filter: (event) ->
      if @value isnt @element.value
        @value = @element.value
        @filtered = (text for text in @options.source when text.indexOf(@value) > -1)
        @$dropdown.empty()
        for text in @filtered
          @$dropdown.append @createItem(text)
        @$dropdown.show()

    createItem: (text) ->
      item = $ '<div class="autocomplete__suggestions__item">' + text + '</div>'
      item.on 'mouseover', @, (event) ->
        event.data.isMouseOver = true
        $(event.target).addClass 'autocomplete__suggestions__item--selected'
      item.on 'mouseout', @, (event) ->
        event.data.isMouseOver = false
        $(event.target).removeClass 'autocomplete__suggestions__item--selected'
      item.on 'click', @, (event) ->
        event.data.selectItem(event)

      return item;

    selectItem: (event) ->
      @element.value = event.target.textContent
      @$dropdown.hide()


  # Plugin definition
  Plugin = (option) ->
    params = arguments

    return this.each () ->
      options = $.extend({}, data, typeof option == 'object' && option)
      $this = $ this
      data = $this.data('axa.autocomplete')

      if not data
        data = new Autocomplete this, options
        $this.data 'axa.autocomplete', data

  # Plugin registration
  $.fn.autocomplete = Plugin
  $.fn.autocomplete.Constructor = Autocomplete

  # DATA-API
  $(window).on 'load', () ->
    $('[data-autocomplete]').each () ->
      $autocomplete = $(this)
      Plugin.call($autocomplete)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
