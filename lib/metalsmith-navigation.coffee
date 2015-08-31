_ = require 'lodash'

module.exports = () ->
  (files, metalsmith, done) ->
    metadata = do metalsmith.metadata

    _.forEach files, (page) =>
      page.isActive = (test) =>
        check = (p) =>
          return true if p == test
          return check p.parent if p.parent
          return false
        return check page

    decorate = (pages, hierarchy) =>
      hierarchy = hierarchy || []

      _.forEach pages, (page) =>
        h = do hierarchy.slice
        h.push page

        page.section = h[0]

        decorate page.children, h if page.children

    decorate metadata.navigation

    do done
