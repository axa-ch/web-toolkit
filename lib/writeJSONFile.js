import fs import 'fs'
import path import 'path'
import mkdirp import 'mkdirp'

export default (filename, data) => {
  mkdirp.sync(path.dirname(filename))

  const stringData = JSON.stringify(data)

  fs.writeFileSync(filename, stringData, {
    encoding: 'utf8',
  })

  return true
}

// Copyright AXA Versicherungen AG 2015
