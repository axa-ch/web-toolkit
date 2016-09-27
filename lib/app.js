import path from 'path'
import express from 'express'
import serveStatic from 'serve-static'

const createApp = () => {
  const app = express()

  app.use(serveStatic(path.resolve(__dirname, '..', 'dist', 'docs')))

  return app
}

export default createApp
