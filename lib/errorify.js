var gutil = require('gulp-util');

module.exports = exports = function (e, plugin) {
  gutil.beep();
  gutil.log(plugin ? gutil.colors.red(plugin) : '', e);
};
/* Copyright AXA Versicherungen AG 2015 */
