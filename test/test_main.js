'use strict'

if ( typeof window === 'undefined' )
    global.requirejs = require( 'requirejs' )


requirejs.config( {
    baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname + '/../app': '../app'}(),
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    paths: {
        requestAnimationFrame: '.',
        test: '../test',
        engineDetector: 'bower_components/engineDetector/app',
        almond: 'bower_components/almond/almond',
        chai: 'bower_components/chai/chai',
        'chai-as-promised': 'bower_components/chai-as-promised/lib/chai-as-promised',
        mocha: 'bower_components/mocha/mocha',
        'normalize-css': 'bower_components/normalize-css/normalize.css',
        requirejs: 'bower_components/requirejs/require',
        async: 'bower_components/requirejs-plugins/src/async',
        depend: 'bower_components/requirejs-plugins/src/depend',
        font: 'bower_components/requirejs-plugins/src/font',
        goog: 'bower_components/requirejs-plugins/src/goog',
        image: 'bower_components/requirejs-plugins/src/image',
        json: 'bower_components/requirejs-plugins/src/json',
        mdown: 'bower_components/requirejs-plugins/src/mdown',
        noext: 'bower_components/requirejs-plugins/src/noext',
        propertyParser: 'bower_components/requirejs-plugins/src/propertyParser',
        'Markdown.Converter': 'bower_components/requirejs-plugins/lib/Markdown.Converter',
        text: 'bower_components/requirejs-plugins/lib/text',
        'sinon-chai': 'bower_components/sinon-chai/lib/sinon-chai',
        sinonjs: 'bower_components/sinonjs/sinon',
        ifEngineIsNode: 'bower_components/engineDetector/app/ifEngineIsNode',
        ifEngineIsBrowser: 'bower_components/engineDetector/app/ifEngineIsBrowser',
        window: 'bower_components/engineDetector/app/window',
        engine: 'bower_components/engineDetector/app/engine'
    }
} )
requirejs( [ 'test/TestRunner' ], function( TestRunner ) {

    new TestRunner()

} )