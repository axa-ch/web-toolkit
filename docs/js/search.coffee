KEY_ENTER = 13
KEY_UP = 38
KEY_DOWN = 40

class Search
  constructor: (input) ->

    # defaults
    @initialized = false
    @error = false

    # get the target node
    @$input = $ input

    # create the autocomplete suggestions box
    @$suggestions = $ '<div class="autocomplete__suggestions"></div>'

    @$input.after @$suggestions

    # get config options
    @baseUrl = @$input.data 'search-base-url'

    if @baseUrl == ''
      @baseUrl = './'

    if @baseUrl.indexOf('/', @baseUrl.length - 1) == -1
      @baseUrl += '/'

    # load the search data / index
    @searchData = getSearchData @$input.data 'search-index-data'

    @searchData.done @initIndex.bind(@)

    @searchData.fail @fail.bind(@)

    # register keyboard events
    @$input.on 'keyup', (e) =>
      key = e.which

      switch key
        when KEY_ENTER
          @openSelected()
          e.preventDefault()
        when KEY_DOWN
          @selectNext()
          e.preventDefault()
        when KEY_UP
          @selectPrevious()
          e.preventDefault()
        else @updateDisplay()

    # register focus / blur
    @$input.on 'focus blur', =>
      @updateDisplay()

  openSelected: ->
    $current = $ @$suggestions.children('.autocomplete__suggestions__item--selected')[0]

    $current.click()

  selectNext: ->
    $current = $ @$suggestions.children('.autocomplete__suggestions__item--selected')[0]

    $next = $current.next()

    if $next? and $next.length > 0
      $current.removeClass 'autocomplete__suggestions__item--selected'
      $next.addClass 'autocomplete__suggestions__item--selected'

  selectPrevious: ->
    $current = $ @$suggestions.children('.autocomplete__suggestions__item--selected')[0]

    $prev = $current.prev()

    if $prev? and $prev.length > 0
      $current.removeClass 'autocomplete__suggestions__item--selected'
      $prev.addClass 'autocomplete__suggestions__item--selected'

  fail: (jqXHR, textStatus, errorThrown) ->

    @error = true

    # in case the target node is already focus'ed
    @updateDisplay()

  initIndex: (data, textStatus, jqXHR) ->
    @searchData = data
    @lunrIdx = lunr.Index.load @searchData.lunr
    @lunrIdx.pipeline.remove lunr.stopWordFilter
    @initialized = true

    # in case the target node is already focus'ed
    @updateDisplay()

  updateDisplay: ->

    if @$input.is ':focus'

      if @error
        @displayError()
      else
        if !@initialized
          @displayLoading()
        else
          @displayResult()


    else

      @hideDisplay()

  hideDisplay: ->
    @$suggestions.empty()

  displayError: ->

    $error = $ '<div class="docs-search__error" >Fehler</div>'

    @$suggestions.empty()

    @$suggestions.append $error

  displayLoading: ->

    $loading = $ '<div class="docs-search__loading" >Loading</div>'

    @$suggestions.empty()

    @$suggestions.append $loading

  displayResult: ->

    results = []

    term = @$input.val().trim()

    if term != ''
      res = @lunrIdx.search term

      for result in res[0..4]

        results.push (=>
          data = @searchData.pages[result.ref]
          $res = $ '<div class="autocomplete__suggestions__item"></div>'
          $res.text data.title
          $res.on 'click', =>
            # TODO: base-url
            window.location.href = @baseUrl + data.link

          $tags = $ '<div class="docs-search__tags" ></div>'
          $tags.text data.tags
          $res.append $tags
        )()

      first = results[0]

      if first?
        first.addClass 'autocomplete__suggestions__item--selected'

    @$suggestions.empty()

    @$suggestions.append results

searchData = []
getSearchData = (searchDataUrl) ->
  if !searchData[searchDataUrl]?
    searchData[searchDataUrl] = $.get searchDataUrl

  return searchData[searchDataUrl]

$ ->
  $("[data-search]").each (i, el) ->
    new Search(el)

#! Copyright AXA Versicherungen AG 2015
