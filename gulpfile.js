const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');

function minifyHTML() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'))
}

function sassCompile() {
    return gulp.src('./src/style/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/style'))
}

exports.default = function () {
    gulp.watch('./src/style/*.scss', { ignoreInitial: false }, gulp.series(sassCompile))
    gulp.watch('./src/index.html', { ignoreInitial: false }, gulp.series(minifyHTML))
}