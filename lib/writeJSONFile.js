var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = exports = function (filename, data) {

  mkdirp.sync(path.dirname(filename));

  var stringData = JSON.stringify(data);

  fs.writeFileSync(filename, stringData, {
    encoding: 'utf8'
  });

  return true;
};

// Copyright AXA Versicherungen AG 2015
