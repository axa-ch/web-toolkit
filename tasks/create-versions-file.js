import git from 'gulp-git'
import writeJSONFile from '../lib/writeJSONFile'
import after from '../lib/after'

export default function (cb) {
  const data = {
    tag: null,
    hash: {
      long: null,
      short: null,
    },
  }

  const end = after(2, (err) => {
    writeJSONFile('./tmp/version.json', data)
    return cb(err)
  }, (err) => {
    if (err) { return cb(err) }
  })

  git.revParse({ args: '--short HEAD' }, (err, hash) => {
    data.hash.short = hash
    return end()
  })

  return git.revParse({ args: 'HEAD' }, (err, hash) => {
    data.hash.long = hash
    return end()
  })
}

//! Copyright AXA Versicherungen AG 2015
