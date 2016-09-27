const metalsmithLog = (msg) =>
  (files, metalsmith, done) => {
    console.log((new Date()).toLocaleTimeString(), msg)
    done()
  }

export default metalsmithLog
