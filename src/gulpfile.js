var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    electron = require('gulp-awesome-electron'),
    shell = require('shelljs'),
    symdest = require('gulp-symdest'),
    config = require('./gulp.config');

var tsConfig = ts.createProject(config.sources.tsProject);

gulp.task('clean', function () {
    return del(config.targets.root, { force: true });
});

gulp.task('delete-tmp', function () {
    return del(config.targets.electron, { force: true });
});

gulp.task('copy-html', function () {
    return gulp.src(config.sources.html)
        .pipe(gulp.dest(config.targets.app));
});

gulp.task('build-vendor-css', function () {
    return gulp.src(config.sources.vendorCss)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.targets.styles));
});

gulp.task('build-vendor-js', function () {
    return gulp.src(config.sources.vendorJs)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.targets.scripts));
});

gulp.task('build-app-scripts', function () {
    gulp.src(config.sources.appTs)
        .pipe(ts(tsConfig))
        .pipe(gulp.dest(config.targets.app));
});

gulp.task('copy-ng2-stuff', function () {
    return gulp.src('./node_modules/@angular/**/*.umd.js')
        .pipe(gulp.dest(config.targets.ng2));
});

gulp.task('copy-rx-stuff', function () {
    return gulp.src('./node_modules/rxjs/**/*.*')
        .pipe(gulp.dest(config.targets.rx));
});

gulp.task('build-index', function () {
    var injectables = gulp.src(config.sources.injectables);

    return gulp.src(config.sources.indexHtml)
        .pipe(inject(injectables, {
            ignorePath: config.targets.webRoot,
            addRootSlash: false
        }))
        .pipe(gulp.dest(config.targets.webRoot));
});

gulp.task('prepare-electron', function () {
    gulp.src(config.sources.electronSources)
        .pipe(gulp.dest(config.targets.electron));

    return gulp.src(config.targets.webRoot + '/**/*')
        .pipe(gulp.dest(config.targets.electron));
});

gulp.task('prepare-cordova', function () {
    gulp.src(config.sources.cordovaSources)
        .pipe(gulp.dest(config.targets.cordova));

    gulp.src(config.targets.webRoot + '/**/*')
        .pipe(gulp.dest(config.targets.cordovaWebRoot));
});

gulp.task('build-cordova', function (done) {
    var  startupDir = shell.pwd();
    shell.cd(config.targets.cordova);
    shell.exec('cordova prepare && cordova build');
    shell.cd(startupDir);
    done();
});

gulp.task('electron-osx', function () {
    return gulp.src(config.targets.electron + '/**/*')
        .pipe(electron({
            version: '1.4.0',
            arch: 'x64',
            platform: 'darwin'
        }))
        .pipe(symdest(config.targets.desktopOsx));
});

gulp.task('electron-win', function () {
    return gulp.src(config.targets.electron + '/**/*')
        .pipe(electron({
            version: '1.4.0',
            arch: 'x64',
            platform: 'win32'
        }))
        .pipe(symdest(config.targets.desktopWin));
});

gulp.task('electron-linux', function () {
    return gulp.src(config.targets.electron + '/**/*')
        .pipe(electron({
            version: '1.4.0',
            arch: 'x64',
            platform: 'linux'
        }))
        .pipe(symdest(config.targets.desktopLinux));
});

gulp.task('default', function (done) {
    runSequence('clean',
        ['build-app-scripts', 'copy-ng2-stuff', 'copy-rx-stuff', 'build-vendor-css', 'build-vendor-js', 'copy-html'],
        'build-index',
        ['prepare-electron', 'prepare-cordova'],
        ['electron-osx', 'electron-linux', 'electron-win', 'build-cordova'],
        'delete-tmp', done);
});