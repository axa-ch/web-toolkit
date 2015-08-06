git = require 'gulp-git'

module.exports = (cb) ->
  git.push('deploy', 'master:gh-pages', {
    args: '--force'
    cwd: './out'
  } , cb).end()

#! Copyright AXA Versicherungen AG 2015
