import gulp from 'gulp';
import babel from 'gulp-babel';
import coffee from 'gulp-coffee';
import merge from 'merge-stream';
import sourcemaps from 'gulp-sourcemaps';
import handleError from '../lib/handle-error';

export default function() {
  let coffey = gulp.src('jquery/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({ bare: true }))
    .on('error', handleError('Coffee failed'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));

  let es6 = gulp.src('jquery/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', handleError('Babel failed'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));

  return merge(coffey, es6);
};

//! Copyright AXA Versicherungen AG 2016
