import browserify from 'browserify'
import incremental from 'browserify-incremental'
import shim from 'browserify-shim'

const bundlers = {}

export default (file, opts) => {
  let bundler = bundlers[file]

  if (bundler) {
    bundler.removeAllListeners('error')
    bundler.removeAllListeners('update')
  } else {
    bundler = browserify(file, {
      ...opts,
      ...incremental.args,
    })

    incremental(bundler)

    bundler
      .transform(shim)

    bundlers[file] = bundler
  }

  return bundler
}
