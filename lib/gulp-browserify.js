import browserify from 'browserify'
import incremental from 'browserify-incremental'
import through2 from 'through2'
import concat from 'concat-stream'

import handleError from '../lib/handle-error'

const bundlers = {}

const createBundler = (file, opts) => {
  let bundler = bundlers[file]

  if (bundler) {
    bundler.removeAllListeners('error')
  } else {
    bundler = browserify(file, {
      ...opts,
      ...incremental.args,
    })

    incremental(bundler)

    bundlers[file] = bundler
  }

  return bundler
}

const gulpBrowserify = (opts) => through2.obj(function (file, encoding, next) {
  const bundler = createBundler(file.path, opts)

  bundler.bundle()
    .on('error', handleError('Browserify failed'))
    .pipe(concat(data => {
      file.contents = data
      next(null, file)
    }))
})

export default gulpBrowserify
