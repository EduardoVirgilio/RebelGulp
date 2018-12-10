const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');

gulp.task('sass', () => {
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'node_modules/wow.js/css/libs/animate.css',
    'src/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('pug', () => {
  return gulp.src([
    'src/pug/*.pug'
  ])
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());

  gulp.watch('dist/*.html').on('change', browserSync.reload);
});


gulp.task('js', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/wow.js/dist/wow.min.js'
  ])
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './src'
  });

  gulp.watch([
    'node_modules/bootstrap/scss/bootstrap.min.scss',
    'src/scss/*.scss'
  ], ['sass']);

  gulp.watch('dist/*.html').on('change', browserSync.reload);

});

gulp.task('font-awesome', () => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('dist/css'));
})

gulp.task('fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['js', 'serve', 'font-awesome', 'fonts', 'pug'])
