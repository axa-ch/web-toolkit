#!/bin/sh

cd /usr/src/app

phantomjs screenshots.js
node compare.js