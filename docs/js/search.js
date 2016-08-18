/* global window */

import $ from 'jquery'
import lunr from 'lunr'

const KEY_ENTER = 13
const KEY_UP = 38
const KEY_DOWN = 40

class Search {
  constructor(input) {
    // defaults
    this.initialized = false
    this.error = false

    // get the target node
    this.$input = $(input)

    // create the autocomplete suggestions box
    this.$suggestions = $('<div class="header-search__suggestions autocomplete__suggestions"></div>')

    this.$input.after(this.$suggestions)

    // get config options
    this.baseUrl = this.$input.data('search-base-url')

    if (this.baseUrl === '') {
      this.baseUrl = './'
    }

    if (this.baseUrl.indexOf('/', this.baseUrl.length - 1) === -1) {
      this.baseUrl += '/'
    }

    // load the search data / index
    this.searchData = getSearchData(this.$input.data('search-index-data'))

    this.searchData.done(this.initIndex.bind(this))

    this.searchData.fail(this.fail.bind(this))

    // register keyboard events
    this.$input.on('keyup', e => {
      const key = e.which

      switch (key) {
        case KEY_ENTER:
          this.openSelected()
          return e.preventDefault()
        case KEY_DOWN:
          this.selectNext()
          return e.preventDefault()
        case KEY_UP:
          this.selectPrevious()
          return e.preventDefault()
        default:
          return this.updateDisplay()
      }
    })

    // register focus / blur
    this.$input.on('focus blur', () => {
      this.updateDisplay()
    })
  }

  openSelected() {
    const $current = $(this.$suggestions.children('.autocomplete__suggestions__item--selected')[0])

    return $current.click()
  }

  selectNext() {
    const $current = $(this.$suggestions.children('.autocomplete__suggestions__item--selected')[0])

    const $next = $current.next()

    if (($next != null) && $next.length > 0) {
      $current.removeClass('autocomplete__suggestions__item--selected')
      $next.addClass('autocomplete__suggestions__item--selected')
    }
  }

  selectPrevious() {
    const $current = $(this.$suggestions.children('.autocomplete__suggestions__item--selected')[0])

    const $prev = $current.prev()

    if (($prev != null) && $prev.length > 0) {
      $current.removeClass('autocomplete__suggestions__item--selected')
      $prev.addClass('autocomplete__suggestions__item--selected')
    }
  }

  fail() {
    this.error = true

    // in case the target node is already focus'ed
    this.updateDisplay()
  }

  initIndex(data) {
    this.searchData = data
    this.lunrIdx = lunr.Index.load(this.searchData.lunr)
    this.lunrIdx.pipeline.remove(lunr.stopWordFilter)
    this.initialized = true

    // in case the target node is already focus'ed
    this.updateDisplay()
  }

  updateDisplay() {
    if (this.$input.is(':focus')) {
      if (this.error) {
        this.displayError()
      } else {
        if (!this.initialized) {
          this.displayLoading()
        } else {
          this.displayResult()
        }
      }
    } else {
      window.setTimeout(() => {
        this.hideDisplay()
      }, 200)
    }
  }

  hideDisplay() {
    this.$suggestions.empty()
  }

  displayError() {
    const $error = $('<div class="docs-search__error" >Fehler</div>')

    this.$suggestions.empty()
    this.$suggestions.append($error)
  }

  displayLoading() {
    const $loading = $('<div class="docs-search__loading" >Loading</div>')

    this.$suggestions.empty()
    this.$suggestions.append($loading)
  }

  displayResult() {
    let results = []
    const term = this.$input.val().trim()

    if (term !== '') {
      const res = this.lunrIdx.search(term)
      const iterable = res.slice(0, 5)

      results = iterable.map((result) => {
        const data = this.searchData.pages[result.ref]
        const $res = $('<div class="autocomplete__suggestions__item"></div>')

        $res.text(data.title)
        $res.on('click', () => {
          // @TODO: base-url
          window.location.href = this.baseUrl + data.link
        })

        const $tags = $('<div class="docs-search__tags" ></div>')
        $tags.text(data.tags)
        return $res.append($tags)
      })

      const first = results[0]

      if (first != null) {
        first.addClass('autocomplete__suggestions__item--selected')
      }
    }

    this.$suggestions.empty()

    return this.$suggestions.append(results)
  }
}

const searchData = []

function getSearchData(searchDataUrl) {
  if (searchData[searchDataUrl] == null) {
    searchData[searchDataUrl] = $.get(searchDataUrl)
  }

  return searchData[searchDataUrl]
}

$(() =>
  $('[data-search]').each((i, el) => new Search(el))
)

//! Copyright AXA Versicherungen AG 2015
