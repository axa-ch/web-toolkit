import http from 'http'
import colors from 'colors'
import app from './app'

const running = 'running'.black.bgGreen
const host = '0.0.0.0'
const port = 3000

http.createServer(app()).listen(port, host, function () {
  console.log(`Server ${running} on ${`http://${host}:${port}`.cyan}`)
})
