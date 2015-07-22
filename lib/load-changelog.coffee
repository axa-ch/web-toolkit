github = require 'octonode'

module.exports = exports = (username, password, cb) ->

  client = github.client
    username: username
    password: password

  ghrepo = client.repo 'axa-ch/style-guide'

  ghrepo.releases (err, data, headers) ->
    if err
      return cb(err)
    else
      return cb(null, data)

  undefined
