import _ from 'lodash'

const navigation = () =>
  (files, metalsmith, done) => {
    const metadata = metalsmith.metadata()

    _.forEach(files, page => page.isActive = test => {
      const check = p => {
        if (p === test) {
          return true
        }
        if (p.parent) {
          return check(p.parent)
        }
        return false
      }
      return check(page)
    })

    const decorate = (pages, hierarchy = []) =>
      _.forEach(pages, page => {
        const h = hierarchy.slice()
        h.push(page)

        page.section = h[0]

        return decorate(
          page.children,
          (page.children ? h : undefined)
        )
      })

    decorate(metadata.navigation)

    return done()
  }

export default navigation
