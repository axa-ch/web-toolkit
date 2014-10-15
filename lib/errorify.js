var gutil = require('gulp-util');

module.exports = exports = function (e) {
  gutil.beep();
  gutil.log(e);
};
