import gulp from 'gulp';

import path from 'path';

import styles from '../lib/styles';

export default () =>

  styles([
      './docs/less/docs.less'
    ],
    [
      path.join(__dirname, '../dist/less'),
      path.join(__dirname, '../docs/less')
    ],
    './dist/docs/css'
  )
;

//! Copyright AXA Versicherungen AG 2015
