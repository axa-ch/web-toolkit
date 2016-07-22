import fs from 'fs'

export default (path) => {
  const contents = fs.readFileSync(path, {
    encoding: 'utf8',
  })

  return JSON.parse(contents)
}

// Copyright AXA Versicherungen AG 2015
