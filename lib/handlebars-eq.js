const ifEq = (a, b, opts) => {
  if(a == b)
    return opts.fn(this);
  else
    return opts.inverse(this);
}

export default ifEq