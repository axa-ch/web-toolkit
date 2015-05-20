gulp = require 'gulp'
iconfont = require 'gulp-iconfont'

errorify = require '../lib/errorify'
after = require '../lib/after'
file = require '../lib/file'

module.exports = (cb) ->

  # Notify execution end on second call, when...
  # * icons.json file is written
  # * fonts are created
  end = after(2, ((err) ->
    cb err
  ), (err) ->
    if err
      cb err
  )

  gulp.src [ './icon-font/**/*.svg' ]
    .pipe iconfont {
      fontName: 'style-guide-font'
      appendCodepoints: true
    }
    .on 'error', errorify
    .on 'codepoints', (points) ->
      glyphs = []
      points.forEach (point) ->
        glyphs.push
          name: point.name
          codepoint: point.codepoint.toString(16).toUpperCase()
      contents = new Buffer(JSON.stringify(glyphs, null, 2))
      file('icons.json', contents).pipe(gulp.dest('./tmp')).on 'end', end
    .pipe gulp.dest './dist/fonts'
    .on 'end', end

  return

# Copyright AXA Versicherungen AG 2015
