import $ from 'jquery'
import ko from 'knockout'
import PouchDB from 'pouchdb'
import GitHub from './github'

class CommunityVM {
  constructor(options) {
    this.options = options
    this.db = new PouchDB('community')
    this.github = new GitHub(options.github)

    this.open = ko.observable(false)
    this.user = ko.observable({
      "login": "davidknezic",
      "id": 198988,
      "avatar_url": "https://avatars.githubusercontent.com/u/198988?v=3",
      "name": "David Knezić",
      "company": "AXA Switzerland",
      "blog": "https://twitter.com/davidknezic",
      "location": "Winterthur ZH, Switzerland",
      "email": "david@knez.io",
      "hireable": true,
      "bio": null,
      "public_repos": 16,
      "public_gists": 1,
      "followers": 24,
      "following": 46,
      "created_at": "2010-02-07T15:44:46Z",
      "updated_at": "2015-10-11T23:12:09Z"
    })
  }

  init() {
    this.db.get('user').then((user) => {
    })
  }

  toggle() {
    this.open(!this.open())
  }

  getAuthUrl() {
    return this.github.getAuthUrl()
  }
}

window.CommunityVM = CommunityVM

// Copyright AXA Versicherungen AG 2015
