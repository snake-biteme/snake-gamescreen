/*jshint esversion: 6 */
'use strict';

const gulp = require('gulp');
const zip = require('gulp-zip');

const buildZip = () => {
    return gulp.src('production/build/**/*')
        .pipe(zip('biteme-gamescreen.zip'))
        .pipe(gulp.dest('production/release/'));
};

const buildPackage = gulp.series(buildZip);

module.exports.package = buildPackage;
