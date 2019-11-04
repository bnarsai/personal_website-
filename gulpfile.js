'use strict';

// Gulp modules
const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

// CSS
const srcCss = './src/scss/**/*.scss';
const destCss = './css';

// JS
const srcJs = ['./src/js/jquery-3.4.1.js', './src/js/main.js'];
const destJs = './js';

// Images
const srcImages = './src/images/**/*';
const destImages = './images';


gulp.task('clean', function () {
	del.sync(destCss);
	del.sync(destJs);
	del.sync(destImages);
});


gulp.task('sass', function () {
	let plugins = [
		autoprefixer({browsers: ['last 1 version']}),
		pxtorem(),
		cssnano()
	];

	return gulp.src(srcCss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(destCss))
		.pipe(livereload())
	;
});


gulp.task('js', function () {
	gulp.src(srcJs)
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(destJs))
		.pipe(livereload())
	;
});


gulp.task('images', function () {
	gulp.src(srcImages)
		.pipe(imagemin())
		.pipe(gulp.dest(destImages))
	;
});


gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(srcCss, ['sass']);
	gulp.watch(srcJs, ['js']);
	gulp.watch(srcImages, ['images']);
});


gulp.task('default', ['watch']);
gulp.task('compile', ['clean', 'sass', 'js', 'images']);
