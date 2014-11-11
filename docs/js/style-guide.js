var StyleGuideViewModel = function (options) {
  var dataMap = URI(options.currentUrl).search(true);

  if (dataMap.code !== undefined) {
    // check dataMap.state too

    console.log(dataMap.code, 'has to be saved');
  }

  this.accessToken = ko.observable(null);

  this.isAuthenticated = ko.computed(function () {
    return false;

    // return (this.accessToken !== null && still signed in);
  }, this);

  this.hasRepoAccess = ko.computed(function () {
    return false;

    // return (has access to repo);
  }, this);

  this.authorizeUrl = function () {
    return URI('https://github.com/login/oauth/authorize')
      .addSearch('client_id', options.clientId)
      .addSearch('scope', ['user', 'repo'].join(','))
      .addSearch('state', 'state');
  };
};
