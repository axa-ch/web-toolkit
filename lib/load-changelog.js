let exports;
import github from 'octonode';

export default exports = function(username, password, cb) {

  let client = github.client({
    username,
    password
  });

  let ghrepo = client.repo('axa-ch/style-guide');

  ghrepo.releases(function(err, data, headers) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, data);
    }
  });

  return undefined;
};

//! Copyright AXA Versicherungen AG 2015
