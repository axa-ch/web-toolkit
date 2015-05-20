gulp = require 'gulp'
del = require 'del'
runSequence = require 'run-sequence'
npm = require 'npm'
readJSONFile = require './lib/readJSONFile'
errorify = require './lib/errorify'
file = require './lib/file'
after = require './lib/after'
config = require './package.json'

require('gulp-load-tasks')({ extensions: [ '.coffee' ] })

gulp.task 'default', [ 'build' ]

# Copyright AXA Versicherungen AG 2015
