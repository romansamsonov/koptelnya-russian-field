import gulp from "gulp";
import webCompress from "gulp-gzip";

const compress = () => {
    return gulp.src(["dist/**/*.{jpg,png,jpeg,gif,svg,css,js,otf,woff,woff2,ttf}"])
        .pipe(webCompress({skipGrowingFiles: true}))
        .pipe(gulp.dest("dist"));
};

export default compress;
