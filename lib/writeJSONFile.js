import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

const writeJSONFile = (filename, data) => {
  mkdirp.sync(path.dirname(filename))

  const stringData = JSON.stringify(data)

  fs.writeFileSync(filename, stringData, {
    encoding: 'utf8',
  })

  return true
}

export default writeJSONFile

// Copyright AXA Versicherungen AG 2015
