/**
 * Dasherizes any given string
 * @param {string} string - The string which should be dasherized.
 * @returns {string} - Returns the dasherized string.
 */
const dasherize = (string) =>
  string.replace(/[A-Z]/g, (char, index) =>
    (index !== 0 ? '-' : '') + char.toLowerCase()
  )

export default dasherize
