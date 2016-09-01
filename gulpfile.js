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
var Server = require('karma').Server;

var path = {
  distribution: {
    folder: 'dist',
    filename: 'official-addthis-angular'
  },
  copyright: 'src/copyright.js',
  source: 'src/**/*.js',
  test: 'test/**/*.js',
  documentation: 'docs',
  examples: 'examples/**/*.js'
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

gulp.task('jslint-src', function() {
  return gulp.src([path.source, 'test/addthis/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jslint-examples', function() {
  return gulp.src([
      path.examples,
      'test/examples/example*/**/*.js',
      'test/examples/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jslint', function(){
  return gulp.start(
    'jslint-examples',
    'jslint-src'
  );
});

gulp.task('docs', function () {
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

gulp.task('test-src', ['jslint-src'], function(done) {
  new Server({
    configFile: __dirname + '/test/addthis.karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-example1', ['jslint-examples'], function(done) {
  new Server({
    configFile: __dirname + '/test/example1.karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-example2', ['jslint-examples'], function(done) {
  new Server({
    configFile: __dirname + '/test/example2.karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-example3', ['jslint-examples'], function(done) {
  new Server({
    configFile: __dirname + '/test/example3.karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test', function(){
  return gulp.start(
    'test-src',
    'test-example1',
    'test-example2',
    'test-example3'
  );
});

gulp.task('build', ['test', 'docs'], function(){
  return gulp.start(
    'build-distribution'
  );
});

gulp.task('watch', ['build'], function() {
  gulp.watch(path.source, ['build']);
  gulp.watch('examples/example1/**/*.js', ['test-example1']);
  gulp.watch('examples/example2/**/*.js', ['test-example2']);
  gulp.watch('examples/example3/**/*.js', ['test-example3']);
});