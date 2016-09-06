import gutil from 'gulp-util'
import notifier from 'node-notifier'

export default (title) => function(err) {
  gutil.log(err.message)

  notifier.notify({
    title,
    message: err,
  })

  this.emit('end')
}

// Copyright AXA Versicherungen AG 2016
