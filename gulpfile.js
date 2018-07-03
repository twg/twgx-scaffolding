var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps')
var scss = require('gulp-sass')
var scssGlob = require('gulp-sass-glob')
var autoPrefixer = require('gulp-autoprefixer')
require('es6-promise').polyfill()
var cleanCss = require('gulp-clean-css')
var browserify = require('gulp-browserify')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var rename = require('gulp-rename')
var del = require('del')
var imagemin = require('gulp-imagemin')
var cleaned = false

// --------------------------------
// Clean
// --------------------------------
gulp.task('clean', function (cb) {
  if (!cleaned) {
    del([
      './style.min.css',
      './scripts.js',
      './images'
    ]).then(function () {
      return cb()
    })
    cleaned = true
  } else {
    return cb()
  }
})

// --------------------------------
// SCSS
// --------------------------------
gulp.task('scss', ['clean'], function () {
  return gulp.src('./src/style.scss')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err)
        this.emit('end')
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(scssGlob())
    .pipe(scss())
    .pipe(autoPrefixer())
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
})

// --------------------------------
// JS
// --------------------------------
gulp.task('js', ['clean'], function () {
  return gulp.src('./src/scripts.js')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err)
        this.emit('end')
      }
    }))
    .pipe(browserify())
    .pipe(babel({
      presets: ['env']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
})

// --------------------------------
// Images
// --------------------------------
gulp.task('images', ['clean'], function () {
  return gulp.src('./src/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./images'))
})

// --------------------------------
// PHP
// --------------------------------
var phpFileLocations = ['src/**/*.php', '*.php']

gulp.task('reload-php', function () {
  browserSync.reload(phpFileLocations)
})

// --------------------------------
// Build
// --------------------------------
gulp.task('build', ['js', 'scss', 'images'])

// --------------------------------
// Default
// --------------------------------
gulp.task('default', ['build'], function () {
  browserSync.init({
    proxy: 'http://localhost:8888',
    open: false
  })
  gulp.watch('src/**/*.js', ['js'])
  gulp.watch('src/**/*.scss', ['scss'])
  gulp.watch(phpFileLocations, ['reload-php'])
})
