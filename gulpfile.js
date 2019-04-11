const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const rebaseUrls = require('gulp-css-rebase-urls');

gulp.task('images', () =>
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./src/main/resources/static/images'))
);

gulp.task('sass', () =>
    gulp.src('./src/styles/default.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rebaseUrls())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/main/resources/static/styles'))
);

gulp.task('build', ['sass', 'images']);
gulp.task('default', ['sass:watch', 'images:watch']);
