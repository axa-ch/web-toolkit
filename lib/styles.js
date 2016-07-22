import gulp from 'gulp'

import sourcemaps from 'gulp-sourcemaps'
import less from 'gulp-less'
import postcss from 'gulp-postcss'
import filter from 'gulp-filter'
import rename from 'gulp-rename'

import pseudoelements from 'postcss-pseudoelements'
import autoprefixer from 'autoprefixer'
import cssmqpacker from 'css-mqpacker'
import csswring from 'csswring'

import errorify from '../lib/errorify'

export default (glob, paths, dest) =>
  gulp.src(glob)
    .pipe(sourcemaps.init())
    .pipe(less({ paths }))
    .on('error', errorify)
    .pipe(postcss([
      autoprefixer(),
      pseudoelements(),
    ]))
    .pipe(sourcemaps.write('.', { sourceRoot: './' }))
    .pipe(gulp.dest(dest))
    .pipe(filter([
      '*',
      '!**/*.map',
    ]))
    .pipe(postcss([
      cssmqpacker(),
      csswring(),
    ]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.', { sourceRoot: './' }))
    .pipe(gulp.dest(dest))

//! Copyright AXA Versicherungen AG 2015
