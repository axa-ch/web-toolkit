minimatch = require 'minimatch'
_ = require 'lodash'

module.exports = () ->
  (files, metalsmith, done) ->

    _.forEach files, (file) =>
      return if !file.children

      children = resolve file.children, files

      file.children = children

      _.forEach children, (child) =>
        child.parent = file

    do done

resolve = (pattern, files) ->
  result = []

  _.forEach files, (file, name) =>
    return if !minimatch name, pattern
    result.push file

  result
