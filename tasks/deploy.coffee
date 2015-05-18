runSequence = require 'run-sequence'

module.exports = (cb) ->
  runSequence(
    'release',
    'deploy-clean',
    'deploy-copy',
    'deploy-init',
    'deploy-config',
    'deploy-add',
    'deploy-commit',
    'deploy-push',
    cb
  )

# Copyright AXA Versicherungen AG 2015
