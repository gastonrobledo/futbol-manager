/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build', // jshint ignore:line
    compile_dir: 'bin', // jshint ignore:line
    static_dir: 'static', // jshint ignore:line

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `public/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`public/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: { // jshint ignore:line
        js: ['public/**/*.js', '!public/**/*.spec.js', '!public/assets/**/*.js'],
        jsunit: ['public/**/*.spec.js'],

        atpl: ['public/app/**/*.tpl.html'],
        ctpl: ['public/common/**/*.tpl.html'],

        html: ['public/index.html', 'public/web.config'],
        css: 'public/css/*.css'
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: { // jshint ignore:line
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: { // jshint ignore:line
        js: [
            'vendor/jquery/dist/jquery.min.js',
            'vendor/jquery-ui/jquery-ui.min.js',
            'vendor/angular/angular.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/moment/moment.js',
            'vendor/lodash/lodash.min.js',
            'vendor/ng-file-upload/ng-file-upload-all.min.js',
            'vendor/konva/konva.min.js'
        ],
        css: [
        ],
        assets: [
        ]
    }
};
