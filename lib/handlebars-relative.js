import path from 'path'

const relative = (target, opts) => {
  const link = opts.data.root.link
  let relativeRoot = ''

  if (link) {
    const depth = opts.data.root.link.split('/').length-1
    
    relativeRoot = '../'.repeat(depth)
  }

  return relativeRoot + (target.startsWith('/') ? target.substring(1) : target)
}

export default relative