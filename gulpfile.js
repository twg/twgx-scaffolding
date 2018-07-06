var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var scssGlob = require('gulp-sass-glob')
var autoPrefixer = require('gulp-autoprefixer');
require('es6-promise').polyfill();
var cleanCss = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// ------------------------------------------
// Convert SCSS to CSS
// ------------------------------------------
gulp.task('sass', function(){
  return gulp.src('src/includes.scss')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(scssGlob())
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('styles.min.css'))
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

// ------------------------------------------
// Move SCSS files
// ------------------------------------------
gulp.task('move', function () {
  return gulp.src('src/**/*.scss')
    .pipe(gulp.dest('dist'))
})

// ------------------------------------------
// Prep and Move JS files
// ------------------------------------------
gulp.task('js', function(){
  return gulp.src('src/index.js')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(browserify())
    .pipe(gulp.dest('dist'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

// ------------------------------------------
// Build Task (no watch)
// ------------------------------------------
gulp.task('build', ['sass', 'js', 'move'])

// ------------------------------------------
// Default Gulp Task
// ------------------------------------------
gulp.task('default',function(){
  gulp.watch('src/scripts.js/**/*.js',['js']);
  gulp.watch('src/styles/**/*.sass',['sass', 'move']);
});
