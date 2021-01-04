"use strict";

var gulp = require("gulp"),
  prefixer = require("gulp-autoprefixer"),
  scss = require("gulp-sass"),
  rigger = require("gulp-rigger"),
  cssmin = require("gulp-clean-css"),
  rimraf = require("rimraf"),
  browserSync = require("browser-sync"),
  stylelint = require("gulp-stylelint"),
  eslint = require("gulp-eslint"),
  // imagemin = require("gulp-imagemin"),
  babel = require("gulp-babel"),
  terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  include = require('gulp-include'),
  sourcemaps = require("gulp-sourcemaps"),
  reload = browserSync.reload;

var path = {
  build: {
    // Here we show where we export build files
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/",
    fonts: "build/fonts/",
  },
  src: {
    // where get files
    html: "src/*.html", // get all files with .html
    js: "src/js/**/*.js", // get only main.js
    lib: "node_modules/jquery/dist/jquery.min.js",
    style: "src/style/*.scss",
    img: "src/img/**/*.*", // get all files from all folders in img
    fonts: "src/fonts/**/*.*",
  },
  watch: {
    // which files we watching
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/style/**/*.scss",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  clean: "./build", // folder which we can clean
};

var config = {
  // settings for browserSync
  server: {
    baseDir: "./build",
  },
  notify: false,
  open: true,
};

gulp.task("html", function () {
  return gulp
    .src(path.src.html) // import html
    .pipe(rigger()) // run them through rigger
    .pipe(gulp.dest(path.build.html)) // export them
    .pipe(reload({ stream: true })); // reload page
});

gulp.task("js", function () {
  return gulp
    .src(path.src.js)
    .pipe(include())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(terser())
    .pipe(sourcemaps.write())
    // .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

gulp.task("lib", function () {
  return gulp
    .src(path.src.lib)
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

gulp.task("style", function () {
  return gulp
    .src(path.src.style) // get styles
    .pipe(scss()) // compile
    .pipe(prefixer()) // add prefixes
    .pipe(cssmin()) // minify
    .pipe(gulp.dest(path.build.css)) // export them
    .pipe(reload({ stream: true })); // reload page
});

gulp.task("image", function () {
  return gulp
    .src(path.src.img) // get images
    .pipe(gulp.dest(path.build.img)) // export them
    .pipe(reload({ stream: true })); // reload page
});

gulp.task("fonts", function () {
  // add fonts
  return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task("stylelint", function () {
  return gulp.src("src/style/**/*.scss").pipe(
    stylelint({
      reporters: [{ formatter: "string", console: true }],
    })
  );
});

gulp.task("clean", function (cb) {
  // use for removing build folder
  return rimraf(path.clean, cb);
});

gulp.task(
  "build",
  gulp.parallel([
    "html",
    "js",
    // 'lib',
    "style",
    "fonts",
    "image",
  ])
);

gulp.task("watch", (done) => {
  gulp.watch(path.watch.html, gulp.series("html"));
  gulp.watch(path.watch.style, gulp.series("style"));
  gulp.watch(path.watch.js, gulp.series("js"));
  gulp.watch(path.watch.img, gulp.series("image"));
  gulp.watch(path.watch.fonts, gulp.series("fonts"));
  done();
});

gulp.task("serve", function () {
  // run browser logic
  browserSync(config);
  browserSync.watch("build", browserSync.reload);
});

gulp.task("default", gulp.parallel(["style", "js", "watch", "serve"]));
