import http from 'http'
import { cyan } from 'colors/safe'
import createApp from './app'

const baseUrlMatcher = getBaseUrlMatcher(process.env.BASE_URL)
const app = createApp()

const host = '0.0.0.0'
const port = 3000

http.createServer((req, res) => {
  req.url = req.url.replace(baseUrlMatcher, '/')
  app(req, res)
}).listen(port, host, () => {
  console.log(`Server ${cyan('running')} on ${cyan(`http://${host}:${port}`)}`)
})

function getBaseUrlMatcher(baseUrl) {
  let base = baseUrl || '/'
  if (base === '') base = '/'
  if (base.slice(-1) !== '/') base += '/'

  return new RegExp(`^${base}?`)
}
