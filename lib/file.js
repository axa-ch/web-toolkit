var gutil = require('gulp-util');
var stream = require('stream');

module.exports = exports = function (filename, contents) {
  var src = stream.Readable({
    objectMode: true
  });

  src._read = function () {
    this.push(new gutil.File({
      cwd: "",
      base: "",
      path: filename,
      contents: contents
    }));

    this.push(null);
  }

  return src;
};

// Copyright AXA Versicherungen AG 2015
