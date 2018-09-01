var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var angularFilesort = require("gulp-angular-filesort");

var paths = {
  css:[ './www/css/**/*.min.css' ],
  sass: ['./scss/ionic.app.scss', './www/vendor/styles/**/*.css'],
  js: ['./www/js/**/*.js', './www/vendor/**/*.js']
};

gulp.task('default', ['sass', 'inject']);

gulp.task('sass', function (done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('inject', function () {
  var target = gulp.src('./www/index.html');
  var css = gulp.src(paths.css);
  var sources = gulp.src(paths.js).pipe(angularFilesort());

  return target.pipe(inject(sources, {ignorePath: 'www/', addRootSlash: false})).pipe(inject(css, {ignorePath: 'www/', addRootSlash: false})).pipe(gulp.dest('./www'));
});

gulp.task('watch', ['sass', 'inject'], function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['inject']);
});
