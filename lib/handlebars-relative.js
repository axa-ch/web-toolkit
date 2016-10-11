import path from 'path'

const relative = (target, opts) => {
  let link = opts.data.root.link
  let relativeRoot = ''

  if (link) {
    if (link.startsWith('/')) {
      link = link.substring(1);
    }
    const depth = link.split('/').length-1
    
    relativeRoot = '../'.repeat(depth)
  }
  
  return relativeRoot + (target.startsWith('/') ? target.substring(1) : target)
}

export default relative