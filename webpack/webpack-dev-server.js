import express from 'express'
import webpack from 'webpack'
import dev from 'webpack-dev-middleware'
import hot from 'webpack-hot-middleware'
import open from 'open'

import createApp from '../lib/app'
import webpackConfig from './bundle.dev.config.babel'

const compiler = webpack(webpackConfig)

const host = '0.0.0.0'
const port = 3000
const serverOptions = {
  contentBase: '/',
  quiet: true,
  noInfo: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
}

const app = express()

app.use(createApp())
app.use(dev(compiler, serverOptions))
app.use(hot(compiler))

app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  } else {
    // eslint-disable-next-line no-console, max-len
    console.info(`    Webpack development server listening on http://${host}:${port}`)

    open(`http://${host}:${port}`)
  }
})
