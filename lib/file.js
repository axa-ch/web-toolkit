import gutil from 'gulp-util'
import stream from 'stream'

export default (filename, contents) => {
  const src = stream.Readable({
    objectMode: true,
  })

  src._read = () => {
    this.push(new gutil.File({
      cwd: '',
      base: '',
      path: filename,
      contents,
    }))

    this.push(null)
  }

  return src
}

// Copyright AXA Versicherungen AG 2015
