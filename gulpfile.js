var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');
var foreach = require('gulp-foreach');
var fs = require('fs');
var gulpDocs = require('gulp-ngdocs');

var path = {
  distribution: {
    folder: 'dist',
    filename: 'official-addthis-angular'
  },
  copyright: 'src/copyright.js',
  source: 'src/**/*.js',
  test: 'test/**/*.js',
  documentation: 'docs'
};

gulp.task('make-folders', function () {
    try {
        fs.mkdirSync(path.distribution.folder);
        fs.mkdirSync(path.documentation);
    }
    catch(err) {
        if (err.code !== 'EEXIST') {
            console.warn(err);
        }
    }
});

gulp.task('clean-distribution', function() {
  var files = path.distribution.folder + '/*';
  return gulp.src(files, {read: false}).pipe(clean());
});

gulp.task('concat-distribution', ['make-folders'], function() {
  var files = [].concat(
    [path.copyright],
    path.source
  );

  return gulp.src(files)
    .pipe(concat(path.distribution.filename + '.js'))
    .pipe(gulp.dest(path.distribution.folder));
});

gulp.task('minify-distribution', ['make-folders'], function() {
  var files = [].concat(
    [path.copyright],
    path.source
  );

  return gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(concat(path.distribution.filename + '.min.js'))
    .pipe(uglify({
      mangle: false,
      output: {
        comments: saveLicense
      }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.distribution.folder));
});

gulp.task('build-distribution', ['clean-distribution'], function(){
  return gulp.start(
    'minify-distribution',
    'concat-distribution'
  );
});

gulp.task('jslint', function() {
  return gulp.src([path.source, 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('docs', [], function () {
  var options = {
    scripts: ['https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-57c460aaf72cda39'],
    html5Mode: false,
    startPage: '/api/addthis.addthisTool',
    title: "official-addthis-angular docs",
    image: "addthis_icon.png",
    imageLink: "https://www.addthis.com",
    titleLink: "/docs/",
    styles: ['doc.css'],
    analytics: {
      account: 'UA-1170033-28'
    }
  }

  return gulpDocs.sections({
    api: {
      glob:[path.source],
      api: true,
      title: 'official-addthis-angular'
    }
  })
  .pipe(gulpDocs.process(options))
  .pipe(gulp.dest('./'+path.documentation));
});

gulp.task('build', ['jslint', 'docs'], function(){
  return gulp.start(
    'build-distribution'
  );
});

gulp.task('watch', ['build'], function() {
  gulp.watch(path.source, ['build']);
  gulp.watch(path.test, ['docs']);
});