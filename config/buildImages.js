import gulp from "gulp";
import plumber from "gulp-plumber";
import image from "gulp-image";

export const imagesRelease = () => {
    const gulpImageProdOptions = {
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true
    };

    return gulp.src("src/{images,svg}/**/*{jpg,png,jpeg,gif,svg}")
        .pipe(plumber())
        .pipe(image(gulpImageProdOptions))
        .pipe(gulp.dest("dist"));
};

export const imagesDev = () => {
    const gulpImageDevOptions = {
        gifsicle: false,
        guetzli: false,
        jpegRecompress: false,
        mozjpeg: false,
        optipng: false,
        pngquant: false,
        svgo: false,
        zopflipng: false,
    };

    return gulp.src("src/{images,svg}/**/*{jpg,png,jpeg,gif,svg}")
        .pipe(plumber())
        .pipe(image(gulpImageDevOptions))
        .pipe(gulp.dest("dist"));
};

export const imagesWatch = done => {
    gulp.watch("src/{images,svg}/**/*{jpg,png,jpeg,gif,svg}", imagesDev);

    done();
};
