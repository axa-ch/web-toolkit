runSequence = require 'run-sequence'

module.exports = (glob, tasks, tasksIfNotWatch) ->

  if process.env.WATCH && (typeof process.env.WATCH == 'boolean' || process.env.WATCH == "true")
    runSequence.apply null, tasks

    $.watch glob, ->
      runSequence.apply null, tasks
  else
    runSequence.apply null, [].concat(tasks).concat(tasksIfNotWatch)

#! Copyright AXA Versicherungen AG 2015
