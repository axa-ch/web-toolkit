import babelify from 'babelify';
import browserify from 'browserify';
import shim from 'browserify-shim';
import coffeeify from 'coffeeify';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import notifier from 'node-notifier';

export default cb =>
  browserify({
      debug: true,
      extensions: ['.js', '.coffee']
    })
    .transform(babelify, {
      presets: ['es2015']
    })
    .transform(coffeeify)
    .transform(shim)
    .add('docs/js/index.js')
    .bundle()
    .on('error', function(err) {
      gutil.log(err.message);
      notifier.notify({
        title: 'Browserify Failed',
        message: err.message
      });
      return this.emit('end');
    }
  )

    .pipe(source('style-guide-docs.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', gutil.log)
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/docs/js'))
;

//! Copyright AXA Versicherungen AG 2015
