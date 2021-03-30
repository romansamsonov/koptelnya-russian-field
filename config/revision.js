import gulp from "gulp";
import gulpRev from "gulp-rev";
import revReplace from "gulp-rev-replace";
import revClean from "gulp-rev-dist-clean";

const doRevision = () => {
    return new Promise((resolve, reject) => {
        gulp.src(["dist/**/*.{jpg,png,jpeg,gif,svg,css,js,otf,woff,woff2,ttf}", "!dist/favicon/**/*"])
            .pipe(gulpRev())
            .pipe(gulp.dest("dist"))
            .pipe(gulpRev.manifest({path: "manifest.json"}))
            .pipe(gulp.dest("dist"))
            .on('end', resolve)
            .on('error', reject);
    });
};

const applyRevisionInHtml = () => {
    const manifest = gulp.src("dist/manifest.json");

    return new Promise((resolve, reject) => {
        gulp.src("dist/**/*.html")
            .pipe(revReplace({manifest}))
            .pipe(gulp.dest("dist"))
            .on('end', resolve)
            .on('error', reject);
    });
};

const applyRevisionInStyles = () => {
    const manifest = gulp.src("dist/manifest.json");

    return new Promise((resolve, reject) => {
        gulp.src("dist/**/*.css")
            .pipe(revReplace({manifest}))
            .pipe(gulp.dest("dist"))
            .on('end', resolve)
            .on('error', reject);
    });
};

const applyRevisionInScripts = () => {
    const replaceJsInPath = (filename) => filename.split("/").slice(-1)[0];
    const manifest = gulp.src("dist/manifest.json");

    return new Promise((resolve, reject) => {
        gulp.src("dist/**/*.js")
            .pipe(revReplace({
                manifest,
                modifyUnreved: replaceJsInPath,
                modifyReved: replaceJsInPath
            }))
            .pipe(gulp.dest("dist"))
            .on('end', resolve)
            .on('error', reject);
    });
};

const applyRevision = async () => {
    await applyRevisionInHtml();
    await applyRevisionInStyles();
    await applyRevisionInScripts();
};

export const reviseAssets = async (done) => {
    await doRevision();
    await applyRevision();

    done();
};

export const cleanRevisedAssets = () => {
    return gulp.src(["dist/**/*", "!dist/*.html", "!dist/favicon/**/*"], {read: false})
        .pipe(revClean("dist/manifest.json", {keepOriginalFiles: false, keepManifestFile: false}));
};
