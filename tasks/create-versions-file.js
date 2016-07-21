import git from 'gulp-git';
import writeJSONFile from '../lib/writeJSONFile';
import after from '../lib/after';

export default function(cb) {
  let data = {
    tag: null,
    hash: {
      long: null,
      short: null
    }
  };

  let end = after(2, (function(err) {
    writeJSONFile('./tmp/version.json', data);
    return cb(err);
  }), function(err) {
    if (err) { return cb(err); }
  }
  );

  git.revParse({ args: '--short HEAD' }, function(err, hash) {
      data.hash.short = hash;
      return end();
    }
  );

  return git.revParse({ args: 'HEAD' }, function(err, hash) {
      data.hash.long = hash;
      return end();
    }
  );
};

//! Copyright AXA Versicherungen AG 2015
