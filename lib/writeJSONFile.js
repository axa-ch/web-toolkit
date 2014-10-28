var fs = require('fs');

module.exports = exports = function (path, data) {

  var stringData = JSON.stringify(data);

  fs.writeFileSync(path, stringData, {
    encoding: 'utf8'
  });

  return true;
};
