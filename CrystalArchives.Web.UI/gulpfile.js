const del = require("del");
const { src, dest, watch, series } = require("gulp");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const postcssPresetEnv = require("postcss-preset-env");
const tailwindcss = require("tailwindcss");

const watchFiles = "../CrystalArchives.Web/**/*.{cshtml,html,js}";
const styles = "styles/tailwind.css";
const stylesDest = "../CrystalArchives.Web/wwwroot/styles/";

const clean = () => del(stylesDest + "**", { force: true });

const buildStyles = () =>
    src(styles)
        .pipe(postcss([tailwindcss, postcssPresetEnv(), cssnano]))
        .pipe(rename("main.css"))
        .pipe(dest(stylesDest));

const watchStyles = () => watch([watchFiles, styles], buildStyles);

exports.dev = series(clean, buildStyles, watchStyles);
exports.prod = series(clean, buildStyles);
exports.default = exports.prod;