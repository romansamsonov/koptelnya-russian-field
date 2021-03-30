import gulp from "gulp";

export const fontsRelease = () => {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
};

export const fontsDev = () => {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
};

export const fontsWatch = done => {
    gulp.watch("src/fonts/**/*", fontsDev);

    done();
};
