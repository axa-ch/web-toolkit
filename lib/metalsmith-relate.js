import minimatch from 'minimatch';
import _ from 'lodash';

export default () =>
  function(files, metalsmith, done) {

    _.forEach(files, file => {
      if (!file.children) { return; }

      let children = resolve(file.children, files);

      file.children = children;

      return _.forEach(children, child => {
        return child.parent = file;
      }
      );
    }
    );

    return done();
  }
;

var resolve = (pattern, files) =>
  _.chain(files)
    .filter((file, name) => {
      return minimatch(name, pattern);
    }
  )
    .sortBy('order')
    .value()
;
