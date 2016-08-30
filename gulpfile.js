var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var glob = require('gulp-sass-glob');
var prefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

gulp.task('style', function() {
	return gulp.src('app/styles/main.scss')
				.pipe(plumber())
				.pipe(glob())
				.pipe(sass())
				.pipe(prefixer({
		      browsers: ['last 15 versions'],
		      cascade: false
		    }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('babel', function() {
	return gulp.src('app/scripts/**/*.js')
				.pipe(plumber())
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(gulp.dest('dist/js'));
});

gulp.task('markup', function() {
	return gulp.src('app/*.html')
				.pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
	gulp.watch('app/styles/**/*.scss', ['style']);
	gulp.watch('app/scripts/**/*.js', ['babel']);
	gulp.watch('app/*.html', ['markup']);
});