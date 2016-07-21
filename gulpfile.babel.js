import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import readJSONFile from './lib/readJSONFile';
import errorify from './lib/errorify';
import file from './lib/file';
import after from './lib/after';
import config from './package.json';

require('gulp-load-tasks')({ extensions: [ '.coffee' ] });

gulp.task('default', [ 'build' ]);

//! Copyright AXA Versicherungen AG 2015
