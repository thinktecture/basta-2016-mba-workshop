
module.exports = {
    sources: {
        html: './app/**/*.html',
        vendorCss: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css'
        ],
        appTs: './app/**/*.ts',
        vendorJs: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/core-js/client/shim.min.js',
        './node_modules/zone.js/dist/zone.js',
        './node_modules/reflect-metadata/Reflect.js',
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './system.config.js'
        ],
        tsProject: './tsconfig.json',
        injectables: [
         '../dist/styles/app.css',
         '../dist/scripts/app.js'],
        indexHtml:'./index.html',
        electronSources: '../electron/**/*'
    },
    targets: {
        
        root: '../dist',
        desktopOsx: '../dist/desktop/osx',
        desktopWin: '../dist/desktop/win',
        desktopLinux: '../dist/desktop/linux',
        electron: '../dist/.tmp/electron',
        styles: '../dist/web/styles',
        scripts: '../dist/web/scripts',
        app: '../dist/web/app',
        rx: '../dist/web/rxjs',
        ng2: '../dist/web/@angular'
    }
};