import runSequence from 'run-sequence'

const runAndWatch = (glob, tasks, tasksIfNotWatch) => {
  if (process.env.WATCH &&
    (typeof process.env.WATCH === 'boolean' ||
    process.env.WATCH === true)) {
    runSequence.apply(null, tasks)

    // @Todo: find out what this $ is about
    return $.watch(glob, () => runSequence.apply(null, tasks))
  }

  return runSequence.apply(null, [
    ...tasks,
    ...tasksIfNotWatch,
  ])
}

export default runAndWatch

//! Copyright AXA Versicherungen AG 2015
