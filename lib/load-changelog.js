import github from 'octonode'

const loadChangeLog = (username, password, cb) => {
  const client = github.client({
    username,
    password,
  })

  const ghrepo = client.repo('axa-ch/style-guide')

  ghrepo.releases((err, data) => {
    if (err) {
      return cb(err)
    } else {
      return cb(null, data)
    }
  })
}

export default loadChangeLog

//! Copyright AXA Versicherungen AG 2015
