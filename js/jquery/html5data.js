/**
 * Extending jQuery's prototype directly.
 * @module html5data
 */

import $ from 'jquery'

$.fn.html5data = html5data

/**
 * The HTML5 `data-{namespace}-*` jQuery Plugin retrieves a hash of namespace-filtered options.
 * Non-Namespaced options are always overwritten by namespaced options, like:
 * `data-namespace-option="bar"` overwrites `data-option="baz"`.
 *
 * @function html5data
 * @param {string} namespace - The HTML5 `data-*` attribute namespace.
 * @returns {Object} Returns `data-*` attribute options filtered for given `namespace`.
 * @requires jquery
 */
function html5data(namespace) {
  let data = this.data()

  if (namespace) {
    const keys = Object.keys(data)
    const namespaceLength = namespace.length

    data = keys.reduce((initial, key) => {
      const isNamespaced = !!~key.indexOf(namespace)
      let html5key = key

      // strip namespace from key
      if (isNamespaced) {
        html5key = key.charAt(namespaceLength).toLowerCase() + key.slice(namespaceLength + 1)
      }

      // make sure to overwrite namespaced options
      if (isNamespaced || !(html5key in initial)) {
        /* eslint-disable no-param-reassign */
        initial[html5key] = data[key]
      }

      return initial
    }, {})
  }

  return data
}
