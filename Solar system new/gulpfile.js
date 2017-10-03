var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var sequence = require('run-sequence');

gulp.task('reload', function(){
    browserSync.reload();
})

gulp.task('serve', ['sass'], function(){

    browserSync({
        server: 'src'
    });

    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/scss/**/*.scss', ['sass']);

});

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        browsers: ['last 3 versions']
    }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('css', function(){
    return gulp.src('src/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('default', ['serve']);