const gulp = require("gulp"),
  uglifycss = require("gulp-uglifycss"),
  rename = require("gulp-rename"),
  terser = require("gulp-terser"),
  eslint = require("gulp-eslint"),
  prettyError = require("gulp-prettyerror"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer");

// Task to compiling and minifying Sass
gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
});

// Linting
gulp.task("lint", function() {
  return gulp
    .src(["./js/*.js"])
    .pipe(prettyError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Task to minify JS
gulp.task(
  "js",
  gulp.series("lint", function() {
    return gulp
      .src("./js/*.js")
      .pipe(terser())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest("./build/js"));
  })
);

// Task to watch for changes to CSS and JS files
gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("js"));
  done();
});

// Load browser-sync
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp
    .watch(["build/css/*.css", "build/js/*.js"])
    .on("change", browserSync.reload);
  done();
});

// Define Default task
gulp.task("default", gulp.parallel("watch", "browser-sync"));
