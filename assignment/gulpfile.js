var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/asset/sass/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/asset/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch',['browserSync', 'sass'], function() {
    var watcher = gulp.watch('app/asset/sass/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);

    watcher.on("change", function(event) {
        console.log("CSS File: " + event.path + " have performed " + event.type);
    });
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  })
});
