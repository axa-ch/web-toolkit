gulp = require 'gulp'
watch = require 'gulp-watch'
sequence = require 'gulp-watch-sequence'
webserver = require 'gulp-webserver'

errorify = require '../lib/errorify'

module.exports = [['build'], (cb) ->
  gulp.src(['dist/docs'])
    .pipe(webserver({
      host: '0.0.0.0',
      port: process.env.PORT or 3000,
      livereload: {
        enable: true,
        port: 35730
      }
    }))

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
    './modernizr.json'
  ], ->
    gulp.start 'modernizr', 'docs-scripts', 'docs-example-scripts', 'docs-inspiration-scripts'
    return
  .on 'error', (err) -> errorify err.message, 'modernizr'

  watch [
    './docs/js/**'
  ], ->
    gulp.start 'docs-scripts'
    return
  .on 'error', (err) -> errorify err.message, 'docs-scripts'

  watch [
    './docs/less/**/*.less'
    './dist/css/style.css'
  ], ->
    gulp.start 'docs-styles'
  .on 'error', (err) -> errorify err.message, 'docs-styles'

  watch [
    './modernizr.json'
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
  ], (sequence 300).getHandler 'scripts', 'docs-scripts'
  .on 'error', (err) -> errorify err.message, 'scripts'

  watch [
    './less/**/*.less'
    './icons/*.svg'
    './less/colors.json'
  ], ->
    gulp.start 'styles'
  .on 'error', (err) -> errorify err.message, 'styles'
]

#! Copyright AXA Versicherungen AG 2015
