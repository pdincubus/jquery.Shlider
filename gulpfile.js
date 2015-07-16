//----------------------------------------------------
//  pull all plugins in
//----------------------------------------------------

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    argv = require('yargs').argv,
    productionMode = !!argv.production // pass --production to gulp to enable this
;

//----------------------------------------------------
//  directories and paths
//----------------------------------------------------

var config = {
        paths: {
            html: {
                src:  ['src/**/*.html'],
                dest: 'dist/'
            },
            javascript: {
                src:  ['src/Shlider.js'],
                dest: 'dist/js'
            },
            scss: {
                src: ['src/scss/**/*.scss'],
                dest: 'dist/css'
            },
            images: {
                src: ['src/img/**/*'],
                dest: 'dist/'
            }
        }
    }

if (productionMode) {
    plugins.util.log('Production mode');
}

//----------------------------------------------------
//  clean dist directory
//----------------------------------------------------

gulp.task('clean', function() {
    return gulp.src(config.base.dest)
        .pipe(plugins.clean());
});

//----------------------------------------------------
//  copying files
//----------------------------------------------------

gulp.task('images', function() {
    return gulp.src(config.paths.images.src, { cwd: 'src' })
        .pipe(plugins.changed(config.paths.images.dest))
        .pipe(plugins.copy(config.paths.images.dest));
});

//----------------------------------------------------
//  styles
//----------------------------------------------------

gulp.task('scss', function() {
    var c = config.paths.scss;
    //use the following line if you're using node-sass:
    return gulp.src(c.src)
    //use the following line if you're using ruby-sass:
    //return sass('src/scss/')
        .on('error', plugins.util.log)
        //for node-sass only:
        .pipe(plugins.sass())
        //for ruby-sass
        //.pipe(plugins.rubySass({
        .on('error', plugins.util.log)
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'Explorer 9'],
            cascade: false
        }))
        .on('error', plugins.util.log)
        .pipe(plugins.csscomb())
        .on('error', plugins.util.log)
        .pipe(plugins.rename('style.css'))
        .pipe(plugins.if(productionMode, plugins.minifyCss({
            debug: true,
            keepSpecialComments: 0
        })))
        .on('error', plugins.util.log)
        .pipe(gulp.dest(c.dest))
    ;
});

//----------------------------------------------------
//  scripts
//----------------------------------------------------

var processJs = function(f, s, d) {
    return gulp.src(s)
        .pipe(plugins.if(productionMode, plugins.uglify()))
        .on('error', plugins.util.log)
        .pipe(gulp.dest(d));
};

gulp.task('scripts', function() {
    var c = config.paths.javascript;

    processJs('Shlider.js', c.src, c.dest);
});

//----------------------------------------------------
//  html
//----------------------------------------------------

gulp.task('html', function() {
    var c = config.paths.html;

    return gulp.src(c.src)
        .pipe(plugins.htmlcomb())
        .on('error', plugins.util.log)
        .pipe(plugins.if(productionMode, plugins.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeComments: true
        })))
        .on('error', plugins.util.log)
        .pipe(gulp.dest(c.dest))
    ;
});

//----------------------------------------------------
//  default task - watch things!
//----------------------------------------------------

gulp.task('default', function() {
    gulp.watch(config.paths.javascript.src, ['scripts']);
    gulp.watch(config.paths.images.src, ['images']);
    gulp.watch(config.paths.html.src, ['html']);
});


//----------------------------------------------------
//  dist tasks
//----------------------------------------------------

gulp.task('dist:scss-and-html', ['clean'], function() {
    gulp.start('scripts', 'images', 'html');
});
