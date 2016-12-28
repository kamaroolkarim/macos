/*
|--------------------------------------------------------------------------
| Gulpfile JS
|--------------------------------------------------------------------------
|
| Author: Kamarool Karim
| Email: kamarool@coolcode.my
| Date Created: 08 December 2016
|
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var prefix = require('gulp-autoprefixer');
var include = require('gulp-include');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var runSequence = require('gulp-run-sequence');
var ext_replace = require('gulp-ext-replace');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
    bower: './resources/assets/bower_components/'
};

gulp.task('browsersync', browserSyncTask);
gulp.task('sass', sassTask);
gulp.task('scripts', scriptJSTask);
gulp.task('vendors', vendorJSTask);
gulp.task('images', imagesTask);
gulp.task('watch', ['browsersync'], watchTask);
gulp.task('build', buildTask);

function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: 'public',
            injectChange: true
        }
    });
}

function sassTask() {
    return gulp.src(['./resources/assets/sass/app.scss'])
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', notifier))
        .pipe(reload({
            stream: true
        }))
        .pipe(concat('style.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(prefix())
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: 'SASS compiled'
        }));
}

function vendorJSTask() {
    return gulp.src([
        config.bower + 'jquery/dist/jquery.min.js',
        config.bower + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
        config.bower + 'vue/dist/vue.min.js',
        // config.bower + 'requirejs/require.js',
        // config.bower + 'vue-moment/vue-moment.min.js',
        config.bower + 'moment/min/moment.min.js'
    ])
        .pipe(include())
        .on('error', notifier)
        .pipe(concat('vendors.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: 'Vendor scripts compiled'
        }));
}

function scriptJSTask() {
    return gulp.src([
        './resources/assets/js/app.js',
        './resources/assets/js/vm.js',
    ])
        .pipe(include())
        .on('error', notifier)
        .pipe(jshint())
        .pipe(concat('script.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify().on('error', notifier))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: 'Scripts compiled'
        }));
}

function imagesTask() {
    return gulp.src(['./resources/assets/img/**/*.{png,jpg,gif,svg}'])
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./public/img/'))
        .pipe(notify({
            message: 'Images optimized',
            onLast: true
        }));
}

function fontTask() {
    return gulp.src([
        './resources/assets/bower_components/Dripicons/fonts/*.{eot,svg,ttf,woff}'
    ]).pipe(gulp.dest('./public/fonts/'))
        .pipe(notify({
            message: 'Fonts copied'
        }));
}

function watchTask() {
    gulp.watch('resources/assets/sass/**/*.scss', ['sass']);
    gulp.watch('resources/assets/bower_components/**/**/**/*.min.js', ['vendors']);
    gulp.watch('resources/assets/js/*.js', ['scripts']);
    gulp.watch('resources/assets/img/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch('public/fonts/.*', ['fonts']);
    gulp.watch('public/**/**/*.html').on('change', reload);
}

function buildTask() {
    runSequence('sass', 'vendors', 'scripts');
}

function notifier(error) {
    notify().write(error);
    this.emit('end');
}
