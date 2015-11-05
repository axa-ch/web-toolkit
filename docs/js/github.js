import $ from 'jquery'
import ko from 'knockout'
import PouchDB from 'pouchdb'

class GitHub {
  constructor(options) {
    this.options = options
  }

  getAuthUrl() {
    return URI(this.options.urls.authorize)
      .addSearch('client_id', this.options.oauth.id)
      .addSearch('scope', this.options.oauth.scopes.join(','))
      .addSearch('state', 'state')
  }

  accessToken(code) {
    return $.ajax({
      type: 'GET',
      url: `${this.options.urls.token}/${code}`
    })
  }

  currentUser() {
    return this.readAccessToken().then((token) => {
      return $.ajax({
        type: 'GET',
        url: `${this.options.urls.api}/user`,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${token}`
        }
      })
    })
  }
}

// Copyright AXA Versicherungen AG 2015
