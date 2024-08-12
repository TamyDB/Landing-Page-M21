import gulp from 'gulp';
import sass from 'gulp-sass';
import * as sassCompiler from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import htmlreplace from 'gulp-html-replace';

const sassCompile = sass(sassCompiler);

function replaceCSS() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({ 'css': 'style/base.css' }))
        .pipe(gulp.dest('./build/'))
}

function imgCompile() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function minifyHTML() {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build/'));
}

function sassCompileTask() {
    return gulp.src('./src/style/base.scss')
        .pipe(sourcemaps.init())
        .pipe(sassCompile({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/style'));
}

export default function () {
    gulp.watch('./src/style/base.scss', { ignoreInitial: false }, gulp.series(sassCompileTask));
    gulp.watch('./src/index.html', { ignoreInitial: false }, gulp.series(replaceCSS, minifyHTML));
    gulp.watch('./src/images/*', { ignoreInitial: false }, gulp.series(imgCompile));
}
