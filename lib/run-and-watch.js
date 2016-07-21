import runSequence from 'run-sequence';

export default function(glob, tasks, tasksIfNotWatch) {

  if (process.env.WATCH && (typeof process.env.WATCH === 'boolean' || process.env.WATCH === "true")) {
    runSequence.apply(null, tasks);

    return $.watch(glob, () => runSequence.apply(null, tasks)
    );
  } else {
    return runSequence.apply(null, [].concat(tasks).concat(tasksIfNotWatch));
  }
};

//! Copyright AXA Versicherungen AG 2015
