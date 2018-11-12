const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const autoPrefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");

// copy HTML file to the public folder
gulp.task("copyHtml", function() {
  gulp.src("./src/*.html").pipe(gulp.dest("./public"));
});

gulp.task("imagesCompress", () =>
  gulp
    .src("./src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./public/images"))
);

// compile SCSS to CSS, adding prefix, minifying CSS
gulp.task("sass:compile", function() {
  gulp
    .src("./src/css/**/*.css")
    .pipe(
      autoPrefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./public/css"));
});

// watch over the changes in source files
gulp.task("watch", function() {
  gulp.watch("./src/index.html", ["copyHtml"]);
  gulp.watch("./src/images/**/*", ["imagesCompress"]);
  gulp.watch("./src/sass/**/*.scss", ["sass:compile"]);
});

// default task
gulp.task("default", ["copyHtml", "imagesCompress", "sass:compile", "watch"]);
