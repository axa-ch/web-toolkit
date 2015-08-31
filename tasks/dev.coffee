gulp = require 'gulp'
watch = require 'gulp-watch'
sequence = require 'gulp-watch-sequence'

errorify = require '../lib/errorify'

module.exports = [['build'], (cb) ->
  gulp.start 'serve'

  watch [
    './docs/page/**/*'
    './docs/layouts/**/*'
    './tmp/icons.json'
    './less/colors.json'
    './package.json',
    './docs/config.json'
  ], (files, cb) ->
    gulp.start 'docs-pages', cb
  .on 'error', (err) -> errorify err.message, 'docs-pages'

  watch [
    './docs/js/**/*.coffee'
    './docs/example-js/**/*.coffee'
  ], ->
    gulp.start 'docs-scripts', 'docs-example-scripts', 'docs-inspiration-scripts'
    return
  .on 'error', (err) -> errorify err.message, 'docs-scripts'

  watch [
    './docs/less/**/*.less'
    './dist/css/style.css'
  ], ->
    gulp.start 'docs-styles'
  .on 'error', (err) -> errorify err.message, 'docs-styles'

  watch [
    './docs/images/**/*'
    './dist/images/**/*'
    './dist/fonts/**/*'
    './dist/css/{style,normalize}.min.css{,.map}'
  ], ->
    gulp.start 'docs-assets'
  .on 'error', (err) -> errorify err.message, 'docs-assets'

  watch [
    'icons/**/*.svg'
  ], ->
    gulp.start 'icons-svg', 'icons'
  .on 'error', (err) -> errorify err.message, 'icons-svg'

  watch [
    './images/**/*'
  ], ->
    gulp.start 'images'
  .on 'error', (err) -> errorify err.message, 'images'

  watch [
    './jquery/**/*'
  ], (sequence 300).getHandler 'jquery', 'docs-scripts', 'docs-example-scripts', 'docs-inspiration-scripts'
  .on 'error', (err) -> errorify err.message, 'jquery'

  watch [
    './ng/**/*'
  ], ->
    gulp.start 'ng'
  .on 'error', (err) -> errorify err.message, 'ng'

  watch [
    './less/**/*.less'
    './icons/*.svg'
    './less/colors.json'
  ], ->
    gulp.start 'styles'
  .on 'error', (err) -> errorify err.message, 'styles'
]

#! Copyright AXA Versicherungen AG 2015
