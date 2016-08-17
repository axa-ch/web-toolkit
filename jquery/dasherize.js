const dasherize = (string) =>
  string.replace(/[A-Z]/g, (char, index) =>
    (index !== 0 ? '-' : '') + char.toLowerCase()
  )

export default dasherize
