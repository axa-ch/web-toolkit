function titleAnnotation() {
  return {
    name: 'title',
    multiple: false,
    parse(text) {
      return text.trim()
    },
  }
}

export default titleAnnotation
