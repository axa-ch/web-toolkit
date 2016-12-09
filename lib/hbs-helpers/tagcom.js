/* eslint-disable no-undef */

const trackGoTo = (path) => {
  window.tc_events_7(
    null,
    'virtual_page',
    { 'virtual_page_name': path },
  )
}

const trackDownload = (filename) => {
  window.tc_events_7(
    null,
    'interaction',
    { 'interaction_type': 'download',
      'interaction_detail': filename,
    }
  )
}

const trackSearchEnter = () => {
  window.tc_events_7(
    null,
    'interaction',
    { 'interaction_type': 'search_enter' }
  )
}

const trackSearchResults = (searchVal, resultsCount) => {
  window.tc_events_7(
    null,
    'interaction',
    { 'interaction_type': 'search_results',
      'interaction_detail': searchVal,
      'interaction_detail2': resultsCount,
    }
  )
}

const trackClickHere = (path) => {
  window.tc_events_7(
     null,
     'interaction',
     { 'interaction_type': 'click_here',
       'interaction_detail': path,
     }
   )
}

export {
  trackGoTo,
  trackDownload,
  trackSearchEnter,
  trackSearchResults,
  trackClickHere,
}
