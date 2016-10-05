import path from 'path'

const relative = (opts) => {
  const depth = opts.data.root.filename.split(path.sep).length-1
  return '../'.repeat(depth)
}

export default relative