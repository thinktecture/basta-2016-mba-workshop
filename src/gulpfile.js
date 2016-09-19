var gulp = require('gulp'),
    del = require('del'),
    runSeq = require('run-sequence'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    electron = require('gulp-awesome-electron'),
    fl = require('gulp-filelog'),
    symdest = require('gulp-symdest'),
    c = require('./gulp.config');

gulp.task('clean', function(){
    return del(c.targets.root, {force:true});
});

gulp.task('delete-tmp', ()=>{
    return del(c.targets.electron, {force:true});
});

gulp.task('copy-html', function(){
    return gulp.src(c.sources.html)
        .pipe(gulp.dest(c.targets.app)); 
});

gulp.task('build-vendor-css', function(){
    return gulp.src(c.sources.vendorCss)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(c.targets.styles));
});

gulp.task('build-vendor-js', function(){
    return gulp.src(c.sources.vendorJs)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(c.targets.scripts));
});
var tsConfig = ts.createProject(c.sources.tsProject);

gulp.task('build-app-scripts', function(){
    gulp.src(c.sources.appTs)
                .pipe(ts(tsConfig))
                .pipe(gulp.dest(c.targets.app));
});

gulp.task('copy-ng2-stuff', ()=>{
    return gulp.src('./node_modules/@angular/**/*.umd.js')
        .pipe(gulp.dest(c.targets.ng2));
});
gulp.task('copy-rx-stuff', ()=>{
    return gulp.src('./node_modules/rxjs/**/*.*')
        .pipe(gulp.dest(c.targets.rx));
});
gulp.task('default', function(done){
    runSeq('clean',
        ['build-app-scripts','copy-ng2-stuff', 'copy-rx-stuff' , 'build-vendor-css', 'build-vendor-js','copy-html'],
        'build-index',
        'prepare-electron',
        ['electron-osx', 'electron-linux', 'electron-win'],
        'delete-tmp',done);
});
gulp.task('prepare-electron', () => {
    gulp.src(c.sources.electronSources)
        .pipe(gulp.dest(c.targets.electron));
    return gulp.src(c.targets.root + '/**/*')
        .pipe(gulp.dest(c.targets.electron));

})
gulp.task('electron-osx', () =>{
    return gulp.src(c.targets.electron + '/**/*')
        .pipe(electron({
            version: '1.4.0',
            arch: 'x64', 
            platform: 'darwin'
        }))
        .pipe(symdest(c.targets.desktopOsx));
});

gulp.task('electron-win', () =>{
    return gulp.src(c.targets.electron + '/**/*')
        .pipe(electron({
            version: '1.4.0',
            arch: 'x64', 
            platform: 'win32'
        }))
        .pipe(symdest(c.targets.desktopWin));
});

gulp.task('electron-linux', () =>{
    return gulp.src(c.targets.electron + '/**/*')
        .pipe(electron({
            version: '1.4.0',
            arch: 'x64', 
            platform: 'linux'
        }))
        .pipe(symdest(c.targets.desktopLinux));
});
gulp.task('build-index', function(){
    
    var injectables = gulp.src(c.sources.injectables);
    injectables.pipe(fl());
    return gulp.src(c.sources.indexHtml)
        .pipe(fl())
        .pipe(inject(injectables, {
            ignorePath: c.targets.webRoot,
            addRootSlash: false
        }))
        .pipe(gulp.dest(c.targets.webRoot));
});