
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
        
        './system.config.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        tsProject: './tsconfig.json',
        injectables: [
         '../dist/web/styles/app.css',
         '../dist/web/scripts/app.js'],
        indexHtml:'./index.html',
        electronSources: './electron/**/*'
    },
    targets: {
        
        root: '../dist',
        webRoot: '../dist/web',
        desktopOsx: '../dist/desktop/osx',
        desktopWin: '../dist/desktop/win',
        desktopLinux: '../dist/desktop/linux',
        electron: '../dist/tmp/electron',
        styles: '../dist/web/styles',
        scripts: '../dist/web/scripts',
        app: '../dist/web/app',
        rx: '../dist/web/rxjs',
        ng2: '../dist/web/@angular'
    }
};