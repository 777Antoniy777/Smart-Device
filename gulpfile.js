'use strict';
/* eslint-disable */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var objectFit = require('postcss-object-fit-images');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var jsConcat = require('gulp-concat');
var jsUglify = require("gulp-uglify");
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');

var image = require("gulp-image");
var resize = require("gulp-image-resize");
var gm = require('gulp-gm');

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      objectFit()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/main/*.js', gulp.series('js-main'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest('source/img'));
});

gulp.task("tinyimages", function() {
  return gulp.src('source/img/placeholders/*.{png,jpg}')
    .pipe(image({
      pngquant: ['--speed=11', '--force', 256, '--quality', 1, '--posterize', 1],
      optipng: false,
      zopflipng: false,
      jpegRecompress: false,
      mozjpeg: ['-quality', 5, '-smooth', 100],
      guetzli: false,
      gifsicle: false,
      svgo: false,
      concurrent: 10,
      quiet: true
    }))
    .pipe(gulp.dest('source/img/placeholders'));
});

gulp.task("resizes", function() {
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(resize({
      percentage: 10,
      cover: true,
    }))
    .pipe(gulp.dest('source/img/placeholders'));
});

gulp.task('min', gulp.series('resizes', 'tinyimages'));

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/{icon-*,htmlacademy*}.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite_auto.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('js-vendor', function () {
  return gulp.src('source/js/vendor/*.js')
    .pipe(jsConcat('vendor.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(jsUglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

gulp.task('js-main', function () {
  return gulp.src('source/js/main/*.js')
    .pipe(jsConcat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(jsUglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source//*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'css', 'sprite', 'copy', 'js-vendor', 'js-main', 'html'));
gulp.task('start', gulp.series('build', 'server'));
