var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('gulp-sass');
var scssGlob = require('gulp-sass-glob')
var autoPrefixer = require('gulp-autoprefixer');
require('es6-promise').polyfill();
var cleanCss = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var del = require('del');
var fileinclude = require('gulp-file-include')

// ------------------------------------------
// Clean dist directory
// ------------------------------------------
var cleaned = false;
gulp.task('clean', function () {
  if (cleaned) {
    return true
  } else {
    cleaned = true
    return del('dist')
  }
})

// ------------------------------------------
// Convert SCSS to CSS
// ------------------------------------------
gulp.task('scss', ['clean'], function(){
  return gulp.src('src/everything.scss')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(scssGlob())
    .pipe(scss())
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
gulp.task('move', ['clean'], function () {
  return gulp.src('src/**/*.scss')
    .pipe(gulp.dest('dist'))
})

// ------------------------------------------
// Combine HTML files
// ------------------------------------------
gulp.task('html', ['clean', 'scss', 'js'], function () {
  return gulp.src('src/index.html')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'))
})

// ------------------------------------------
// Prep and Move JS files
// ------------------------------------------
gulp.task('js', ['clean'], function(){
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
gulp.task('build', ['scss', 'js', 'move', 'html'])

// ------------------------------------------
// Default Gulp Task
// ------------------------------------------
gulp.task('default', ['build'],function(){
  gulp.watch('src/**/*.html',['build']);
  gulp.watch('src/**/*.js',['build']);
  gulp.watch('src/**/*.scss',['build']);
});
