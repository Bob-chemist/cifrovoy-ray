const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const concatCSS	   = require("gulp-concat-css")

function style() {
    return (
        gulp
            .src("src/sass/*.sass")
            .pipe(sass()
            .on("error", sass.logError))
            .pipe(autoprefixer({
  	            browsers: ['last 2 versions'],
  	            cascade: false
  	        }))
  	        .pipe(concatCSS('style.css'))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream())
    );
}
 
function watch() {
    browserSync.init({
        server: {
            baseDir: "src"
        }        
    });
    gulp.watch("src/sass/*.sass", style);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}
 

gulp.task('default', watch)
