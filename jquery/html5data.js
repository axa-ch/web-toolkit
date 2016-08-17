import $ from 'jquery'

$.fn.html5data = html5data

/**
 * The HTML5 `data-{namespace}-*` jQuery Plugin retrieves a hash of filters options.
 *
 * @param {string} namespace - The HTML5 data-* attribute namespace.
 * @returns {Object} - Returns data-* attribute options filtered for given `namespace`.
 * @requires jquery
 */
function html5data(namespace) {
  let data = this.data()

  if (namespace) {
    const keys = Object.keys(data)
    const namespaceLength = namespace.length

    data = keys.reduce((initial, key) => {
      if (!!~key.indexOf(namespace)) {
        // strip namespace from key
        const html5key = key.charAt(namespaceLength).toLowerCase() + key.slice(namespaceLength + 1)
        /* eslint-disable no-param-reassign */
        initial[html5key] = data[key]
      }

      return initial
    }, {})
  }

  return data
}
