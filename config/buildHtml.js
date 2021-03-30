import gulp from "gulp";
import inject from "gulp-inject";
import htmlmin from "gulp-htmlmin";
import svgstore from "gulp-svgstore";
import condition from "gulp-if";
import glob from "glob";
import fs from "fs";
import del from "del";

const deleteModulepreloadManifest = () => {
    del.sync("./dist/js/modulepreload.json");
};

const deleteInjectedSvg = () => {
    del.sync('dist/svg/inject/**/*');
    del.sync('dist/svg/inject');
};

const getAssetsInjectFunc = (fileName) => {
    const targets = gulp.src(
        [
            'dist/css/fonts.css',
            `dist/css/${fileName}.css`,
            `dist/js/${fileName}.js`,
            `dist/js/nomodule/${fileName}-bundle.js`
        ],
        {read: false, allowEmpty: true}
    );

    return inject(targets, {
        removeTags: true,
        ignorePath: 'dist/',
        transform: function (filepath) {
            if (filepath.indexOf(".css") !== -1) {
                return inject.transform.apply(inject.transform, arguments);
            }

            if (filepath.indexOf("nomodule") !== -1) {
                return `<script src="${filepath}" nomodule></script>`;
            }

            return `<script src="${filepath}" type="module"></script>`;
        }
    })
};

const getFontPreloadInjectFunc = () => {
    const targets = gulp.src('dist/fonts/**/*.woff2', {read: false, allowEmpty: true});

    return inject(targets, {
        removeTags: true,
        ignorePath: 'dist/',
        name: 'font-preload',
        transform: function (filepath) {
            return `<link rel="preload" as="font" href="${filepath}" crossorigin="anonymous">`;
        }
    })
};

const getCSSPreloadInjectFunc = (fileName) => {
    const targets = gulp.src(['dist/css/fonts.css', `dist/css/${fileName}.css`], {read: false, allowEmpty: true});

    return inject(targets, {
        removeTags: true,
        ignorePath: 'dist/',
        name: 'css-preload',
        transform: function (filepath) {
            return `<link rel="preload" as="style" href="${filepath}">`;
        }
    })
};

const getSvgInjectFunc = () => {
    const targets = gulp.src('dist/svg/inject/**/*.svg').pipe(svgstore({inlineSvg: true}));

    return inject(targets, {
        removeTags: true,
        transform: (_, file) => {
            return file.contents.toString();
        }
    })
};

const getBuildFuncs = (files, isProd) => {
    return files.map(file => {
        const [fileName] = file.split("/")[1].split(".");

        return new Promise((resolve, reject) => {
            gulp.src(file)
                .pipe(getAssetsInjectFunc(fileName))
                .pipe(getFontPreloadInjectFunc())
                .pipe(getCSSPreloadInjectFunc(fileName))
                .pipe(getSvgInjectFunc())
                .pipe(condition(isProd, htmlmin({collapseWhitespace: true})))
                .pipe(gulp.dest("dist"))
                .on('end', resolve)
                .on('error', reject);
        })
    });
};

const buildHtml = async (isProd = false) => {
    const files = glob.sync("src/*.html");

    return await Promise.all(getBuildFuncs(files, isProd));
};

export const htmlRelease = async (done) => {
    await buildHtml(true);

    deleteInjectedSvg();

    done();
};

export const htmlDev = async (done) => {
    await buildHtml();

    done();
};

export const htmlWatch = done => {
    gulp.watch(["dist/css/**/*.css", "dist/js/*.js", "src/*.html", "dist/svg/**/*.svg", "dist/favicon/**/*"], htmlDev);

    done();
};