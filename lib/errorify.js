import gutil from 'gulp-util'

export default (e, plugin) => {
  gutil.beep()
  gutil.log(plugin ? gutil.colors.red(plugin) : '', e)
}

// Copyright AXA Versicherungen AG 2015
