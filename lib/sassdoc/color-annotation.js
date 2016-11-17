function colorAnnotation() {
  return {
    name: 'color',
    parse(text) {
      return text.trim()
    },
  }
}

export default colorAnnotation
