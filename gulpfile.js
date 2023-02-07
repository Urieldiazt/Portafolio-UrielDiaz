//Gulp
const {src, dest, watch, parallel} = require('gulp');

//sass
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//js
const jsterser = require('gulp-terser-js');

//imagenes
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

function css(done){
    src('src/scss/**/*.scss') //Identifica el archivo sass
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())   //Compila sass
        .pipe(postcss([cssnano(), autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))   //Alamcena en disco duro
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(jsterser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
    done();    
}

function versionWebp(done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionAvif(done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionImagemin(done){
    const opciones = {
        optimitionLevel:3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}


function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javaScript)
}

exports.css = css;
exports.javaScript =javaScript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.versionImagemin = versionImagemin;
exports.dev = parallel(versionWebp, versionAvif, versionImagemin, javaScript, dev);