const gulp = require('gulp');
const scss = require('gulp-sass');
const nodemon = require('gulp-nodemon');

gulp.task('scss', () => {
  return gulp.src('./scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'server.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});


gulp.task('watch', () => {
  gulp.watch('./scss/**/*.scss', ['scss']);
});

gulp.task('default', ['scss', 'nodemon', 'watch']);