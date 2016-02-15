var gutil = require('gulp-util')
var notifier = require('node-notifier')

module.exports = handleError

function handleError(title) {
  return function (err) {
    gutil.log(err.message)

    notifier.notify({
      title: title,
      message: err
    })

    this.emit('end')
  }
}

// Copyright AXA Versicherungen AG 2016
