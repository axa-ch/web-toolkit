/* eslint-disable no-undef */

const GoTo = (path) => {
  window.tc_events_7(
    null,
    'virtual_page',
    { 'virtual_page_name': path },
  )
}

const Download = (filename) => {
  window.tc_events_7(
    null,
    'interaction',
    { 'interaction_type': 'download',
      'interaction_detail': filename,
    }
  )
}

const SearchEnter = () => {
  window.tc_events_7(
    null,
    'interaction',
    { 'interaction_type': 'search_enter' }
  )
}

const SearchResults = (searchVal, resultsCount) => {
  window.tc_events_7(
    null,
    'interaction',
    { 'interaction_type': 'search_results',
      'interaction_detail': searchVal,
      'interaction_detail2': resultsCount,
    }
  )
}

const ClickHere = (path) => {
  window.tc_events_7(
     null,
     'interaction',
     { 'interaction_type': 'click_here',
       'interaction_detail': path,
     }
   )
}

export {
  GoTo,
  Download,
  SearchEnter,
  SearchResults,
  ClickHere,
}
