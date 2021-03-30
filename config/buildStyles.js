import gulp from "gulp";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import prefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";

export const stylesRelease = () => {
    return gulp.src("src/styles/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(prefixer())
        .pipe(cleanCSS({
            level: {
                2: {
                    mergeMedia: false
                }
            }
        }))
        .pipe(gulp.dest("dist/css"));
};

export const stylesDev = () => {
    return gulp.src("src/styles/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.init())
        .pipe(prefixer())
        .pipe(cleanCSS({
            debug: true, level: {
                2: {
                    mergeMedia: false
                }
            }
        }))
        .pipe(gulp.dest("dist/css"));
};

export const stylesWatch = done => {
    gulp.watch("src/styles/**/*.scss", stylesDev);

    done();
};
