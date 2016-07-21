var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var es = require('event-stream');

// always put return at the beginning of a task
// think it as the returned from an ajax call

//convert coffee script to js script
// this cannot be done in the same task as 'script' due to the fact,
// one task cannot be processed in the 
// this needs to be completed before concatenation in the 'scripts' gulp task
gulp.task('coffee', function(){
    return gulp.src('src/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('src'))
});

//.pipe is one thing that differentiates gulp from grunt: piping operations together
//concatenate before uglify
gulp.task('scripts_coffee', ['coffee'], function(){
    return gulp.src('src/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// to get rid of the compiled js as intermediate results,
// to avoid confusion between original src files and generated files
// we can leverage event stream
gulp.task('scripts', function(){
// keep the converted js from coffee files in memeory
var javaScriptFromCoffeeScript = gulp.src('src/*.coffee')
.pipe(coffee())

// keep the original js in memory 
var js = gulp.src('src/*.js')

// merged the two files
return es.merge(javaScriptFromCoffeeScript,js)
.pipe(concat('all.min.js'))
.pipe(uglify())
.pipe(gulp.dest('dist'));
});


//{js, coffee}
//anything changes in one of the 
gulp.task('watch',function() {
    gulp.watch('src/*.{js,coffee}',['scripts'])
});