import gulp from 'gulp'
import template from 'gulp-template'
import rename from 'gulp-rename'

import readJSONFile from '../lib/readJSONFile'

export default () =>

  gulp.src(['./less/style/variables.less.lodash'], { base: './less/' })
    .pipe(template({ colors: readJSONFile('./less/colors.json') }))
    .pipe(rename({ extname: '' }))
    .pipe(gulp.dest('./dist/less'))

//! Copyright AXA Versicherungen AG 2015
