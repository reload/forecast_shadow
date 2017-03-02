/**
 * @file
 * Gulpfile for novasol extranet.
 */

/*jshint esversion: 6 */
'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import bourbon from 'node-bourbon';

// Sass.
gulp.task('sass', () => {
  return gulp.src('src/*.scss')
    .pipe(sass({
      includePaths: bourbon.includePaths,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

// Sass watch.
gulp.task('sass:watch', () => {
  gulp.watch('src/**/*.scss', ['sass']);
});

// Register workers.
gulp.task('default', ['sass', 'sass:watch']);
gulp.task('build', ['sass']);
