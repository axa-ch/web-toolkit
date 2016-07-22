const after = (count, afterFn, beforeFn) => {
  let timesCalled = 0

  return (...args) => {
    const fn = (++timesCalled >= 2 ? afterFn : beforeFn)

    if (fn) fn.apply(this, args)
  }
}

export default after

// Copyright AXA Versicherungen AG 2015
