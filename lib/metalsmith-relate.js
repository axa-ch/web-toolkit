import minimatch from 'minimatch'
import _ from 'lodash'

const relate = () =>
  (files, metalsmith, done) => {
    _.forEach(files, file => {
      if (!file.children) { return }

      const children = resolve(file.children, files)

      file.children = children

      _.forEach(children, child => {
        child.parent = file
      })
    })

    return done()
  }

function resolve(pattern, files) {
  return _.chain(files)
    .filter((file, name) => minimatch(name, pattern))
    .sortBy('order')
    .value()
}

export default relate

