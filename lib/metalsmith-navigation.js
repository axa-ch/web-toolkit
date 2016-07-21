import _ from 'lodash';

export default () =>
  function(files, metalsmith, done) {
    let metadata = metalsmith.metadata();

    _.forEach(files, page => {
      return page.isActive = test => {
        let check = p => {
          if (p === test) { return true; }
          if (p.parent) { return check(p.parent); }
          return false;
        };
        return check(page);
      };
    }
    );

    let decorate = (pages, hierarchy) => {
      hierarchy = hierarchy || [];

      return _.forEach(pages, page => {
        let h = hierarchy.slice();
        h.push(page);

        page.section = h[0];

        return decorate(page.children, (page.children ? h : undefined));
      }
      );
    };

    decorate(metadata.navigation);

    return done();
  }
;
