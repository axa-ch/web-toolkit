function ifEq(a, b, opts) {
  if (a === b) {
    return opts.fn(this)
  }

  return opts.inverse(this)
}

export default ifEq
