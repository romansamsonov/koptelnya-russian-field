import gulp from "gulp";
import del from "del";

import * as JS from "./config/buildScripts";
import * as Styles from "./config/buildStyles";
import * as Images from "./config/buildImages";
import * as HTML from "./config/buildHtml";
import * as Fonts from "./config/buildFonts";
import * as Revision from "./config/revision";
import compress from "./config/webCompress";
import devServer from "./config/devServer";

export const serveDev = () => devServer();

export const clean = (done) => {
    del.sync("dist");

    done();
};

export const release = gulp.series(
    JS.scriptsRelease,
    Styles.stylesRelease,
    Images.imagesRelease,
    Fonts.fontsRelease,
    HTML.htmlRelease,
    Revision.reviseAssets,
    Revision.cleanRevisedAssets,
    compress,
);

export const build = gulp.series(
    JS.scriptsDev,
    Styles.stylesDev,
    Images.imagesDev,
    Fonts.fontsDev,
    HTML.htmlDev,
);

export const def = gulp.series(
    JS.scriptsWatch,
    Styles.stylesWatch,
    Images.imagesWatch,
    Fonts.fontsWatch,
    HTML.htmlWatch,
    serveDev,
);

export default def;
