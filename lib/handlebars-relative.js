import path from 'path'

const relative = (target, opts) => {
  const depth = opts.data.root.filename.split(path.sep).length-1
  return '../'.repeat(depth) + (target.startsWith('/') ? target.substring(1) : target)
}

export default relative