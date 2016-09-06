import gulp from 'gulp'
import cached from 'gulp-cached'

module.exports = () =>
  gulp.src([
      './node_modules/zeroclipboard/dist/ZeroClipboard.swf',
      // use an [i] to set the gulp base path to ./images/
      './docs/[i]mages/**/*',
      // use an [i] to set the gulp base path to ./images/
      './dist/[i]mages/**/*',
      // use an [f] to set the gulp base path to ./fonts/
      './dist/[f]onts/**/*',
      // use a [c] to set the gulp base path to ./css/
      './dist/[c]ss/{style,normalize}.min.css{,.map}',
      // use an [c] to set the gulp base path to ./images/
      './docs/[c]ontent/**/*',

      './modernizr.json',
    ])
    .pipe(cached('docs-assets'))
    .pipe(gulp.dest('./dist/docs/'))

//! Copyright AXA Versicherungen AG 2015
