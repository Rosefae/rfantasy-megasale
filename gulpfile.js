// Gulp only handles CSS stuff.
// For everything else, please see .eleventy.js

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

var scss = function(cd){
    return gulp.src('src/_styles/**/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/_styles'));
    cd();
}

var watchScss = function(cd){
    gulp.watch('src/_styles/**/*.scss', { ignoreInitial:false }, scss);
    cd();
}

var prodScss = function(cd){
    return gulp.src('src/_styles/**/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/_styles'));
    cd();
}

exports.scss = scss;
exports.default = watchScss;
exports.prodscss = prodScss;
