import browserify from 'browserify'
import incremental from 'browserify-incremental'
import aliasify from 'aliasify'
import shim from 'browserify-shim'

const bundlers = {}

const aliasifyConfig = {
  aliases: {
    react: './node_modules/react/dist/react.js',
    'react-dom': './node_modules/react-dom/dist/react-dom.js',
  },
  verbose: false,
}

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
      .transform(aliasify, aliasifyConfig)

    bundlers[file] = bundler
  }

  return bundler
}
