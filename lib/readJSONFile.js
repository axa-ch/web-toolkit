var fs = require('fs');

module.exports = exports = function (path) {
  var contents = fs.readFileSync(path, {
    encoding: 'utf8'
  });

  return JSON.parse(contents);
};

// Copyright AXA Versicherungen AG 2015
