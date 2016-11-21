function replace(string, search, replacement) {
  return (string || '').split(search).join(replacement)
}

export default replace
