gulp = require 'gulp'
$ = require('gulp-load-plugins')()

errorify = require '../lib/errorify'

module.exports = (cb) ->
  gulp.src [ './icons/*.svg' ]
    .pipe $.iconfont { fontName: 'temporary' }
    .on 'error', errorify
    .on 'codepoints', (codepoints) ->
      gulp.src './less/style/blocks/icon.less.lodash', { base: './less' }
        .pipe $.template { glyphs: codepoints }
        .on 'error', errorify
        .pipe $.rename('style/blocks/icon.less')
        .pipe gulp.dest './dist/less'
        .on 'end', ->
          cb()

  # do NOT return the gulp stream since it is async
  return

# Copyright AXA Versicherungen AG 2015
