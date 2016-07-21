import $ from 'jquery';
import lunr from 'lunr';

let KEY_ENTER = 13;
let KEY_UP = 38;
let KEY_DOWN = 40;

class Search {
  constructor(input) {

    // defaults
    this.initialized = false;
    this.error = false;

    // get the target node
    this.$input = $(input);

    // create the autocomplete suggestions box
    this.$suggestions = $('<div class="header-search__suggestions autocomplete__suggestions"></div>');

    this.$input.after(this.$suggestions);

    // get config options
    this.baseUrl = this.$input.data('search-base-url');

    if (this.baseUrl === '') {
      this.baseUrl = './';
    }

    if (this.baseUrl.indexOf('/', this.baseUrl.length - 1) === -1) {
      this.baseUrl += '/';
    }

    // load the search data / index
    this.searchData = getSearchData(this.$input.data('search-index-data'));

    this.searchData.done(this.initIndex.bind(this));

    this.searchData.fail(this.fail.bind(this));

    // register keyboard events
    this.$input.on('keyup', e => {
      let key = e.which;

      switch (key) {
        case KEY_ENTER:
          this.openSelected();
          return e.preventDefault();
        case KEY_DOWN:
          this.selectNext();
          return e.preventDefault();
        case KEY_UP:
          this.selectPrevious();
          return e.preventDefault();
        default: return this.updateDisplay();
      }
    }
    );

    // register focus / blur
    this.$input.on('focus blur', () => {
      return this.updateDisplay();
    }
    );
  }

  openSelected() {
    let $current = $(this.$suggestions.children('.autocomplete__suggestions__item--selected')[0]);

    return $current.click();
  }

  selectNext() {
    let $current = $(this.$suggestions.children('.autocomplete__suggestions__item--selected')[0]);

    let $next = $current.next();

    if (($next != null) && $next.length > 0) {
      $current.removeClass('autocomplete__suggestions__item--selected');
      return $next.addClass('autocomplete__suggestions__item--selected');
    }
  }

  selectPrevious() {
    let $current = $(this.$suggestions.children('.autocomplete__suggestions__item--selected')[0]);

    let $prev = $current.prev();

    if (($prev != null) && $prev.length > 0) {
      $current.removeClass('autocomplete__suggestions__item--selected');
      return $prev.addClass('autocomplete__suggestions__item--selected');
    }
  }

  fail(jqXHR, textStatus, errorThrown) {

    this.error = true;

    // in case the target node is already focus'ed
    return this.updateDisplay();
  }

  initIndex(data, textStatus, jqXHR) {
    this.searchData = data;
    this.lunrIdx = lunr.Index.load(this.searchData.lunr);
    this.lunrIdx.pipeline.remove(lunr.stopWordFilter);
    this.initialized = true;

    // in case the target node is already focus'ed
    return this.updateDisplay();
  }

  updateDisplay() {

    if (this.$input.is(':focus')) {

      if (this.error) {
        return this.displayError();
      } else {
        if (!this.initialized) {
          return this.displayLoading();
        } else {
          return this.displayResult();
        }
      }


    } else {

      return this.hideDisplay();
    }
  }

  hideDisplay() {
    return this.$suggestions.empty();
  }

  displayError() {

    let $error = $('<div class="docs-search__error" >Fehler</div>');

    this.$suggestions.empty();

    return this.$suggestions.append($error);
  }

  displayLoading() {

    let $loading = $('<div class="docs-search__loading" >Loading</div>');

    this.$suggestions.empty();

    return this.$suggestions.append($loading);
  }

  displayResult() {

    let results = [];

    let term = this.$input.val().trim();

    if (term !== '') {
      let res = this.lunrIdx.search(term);

      let iterable = res.slice(0, 5);
      for (let i = 0; i < iterable.length; i++) {

        let result = iterable[i];
        results.push((() => {
          let data = this.searchData.pages[result.ref];
          let $res = $('<div class="autocomplete__suggestions__item"></div>');
          $res.text(data.title);
          $res.on('click', () => {
            // TODO: base-url
            return window.location.href = this.baseUrl + data.link;
          }
          );

          let $tags = $('<div class="docs-search__tags" ></div>');
          $tags.text(data.tags);
          return $res.append($tags);
        }
        )()
        );
      }

      let first = results[0];

      if (first != null) {
        first.addClass('autocomplete__suggestions__item--selected');
      }
    }

    this.$suggestions.empty();

    return this.$suggestions.append(results);
  }
}

let searchData = [];
var getSearchData = function(searchDataUrl) {
  if (searchData[searchDataUrl] == null) {
    searchData[searchDataUrl] = $.get(searchDataUrl);
  }

  return searchData[searchDataUrl];
};

$(() =>
  $("[data-search]").each((i, el) => new Search(el))
);

//! Copyright AXA Versicherungen AG 2015
