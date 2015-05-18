require 'gulp-coffee/node_modules/coffee-script/register'

gulp = require 'gulp'
$ = require('gulp-load-plugins')({ extensions: [ 'coffee' ] })
del = require 'del'
runSequence = require 'run-sequence'
npm = require 'npm'
readJSONFile = require './lib/readJSONFile'
errorify = require './lib/errorify'
file = require './lib/file'
after = require './lib/after'
config = require './package.json'


$.loadTasks()

gulp.task 'default', [ 'build' ]

# Copyright AXA Versicherungen AG 2015
