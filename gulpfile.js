var gulp = require("gulp");
var plumber = require("gulp-plumber");
var gutil = require("gulp-util");
var babel = require("gulp-babel");
var del = require('del');

gulp.task('clean', function(cb) {
  return del('bin/**', cb);
});

gulp.task( "build-compile", function(){
  gulp.src( "src/**/*.js" )
    .pipe(plumber())
    .pipe( babel( {
        "presets": [ "es2015" ],
        "plugins": [ "array-includes", "transform-async-to-generator", "syntax-flow",
    "transform-decorators-legacy",
    "transform-flow-strip-types" ]
    } ) )
    .on('error', (err) => {
      gutil.log(gutil.colors.red('[Compilation Error]'));
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe( gulp.dest( "bin" ) );
});

gulp.task( "build-copy", function(){
  gulp.src( "src/**/*.json" )
      .pipe( gulp.dest( "bin" ) );
});


gulp.task( "build", ["build-compile", "build-copy"]);

//gulp.task( "docs", task( "apidoc" ) );

gulp.task( "watch", function() {
  gulp.watch( "src/**/*.js", [ "build" ] );
  gulp.watch( "src/**/*.json", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );
gulp.task( "work", [ "build", "watch" ] );
