var EngineDetector = function() {
    this.isNode = false
    this.isBrowser = false
    this.isUnknown = false
    this._exports
    this.detect()
}

EngineDetector.prototype = {

    detect: function() {
        if ( typeof module !== 'undefined' && module.exports )
            this._setAsNode()
        else if ( typeof window !== "undefined" )
            this._setAsBrowser()
        else
            this._setAsUnknown()
    },

    _setAsNode: function() {
        this.isNode = true
        this.name = 'node'
    },

    _setAsBrowser: function() {
        this.isBrowser = true
        this._global = window
        this.name = 'browser'
    },

    _setAsUnknown: function() {
        this.isUnknown = true
        this.name = 'unknown'
    },

    setGlobal: function( e ) {
        this._global = e
    },

    ifNode: function( f ) {
        if ( this.isNode )
            f()
    },

    ifBrowser: function( f ) {
        if ( this.isBrowser )
            f()
    },


    exports: function( key, exported ) {
        if ( this.isNode ) {
            this._global.exports = exported
        } else if ( this.isBrowser )
            this._global[  key ] = exported
    },

}

var engine = new EngineDetector()


var baseUrl, requirejs;

engine.ifNode( function() {

    baseUrl = __dirname
    requirejs = require( 'requirejs' )
    engine.setGlobal( module )

} )

engine.ifBrowser( function() {
    baseUrl = '.'
} )


requirejs.config( {
    baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname: '.'}(),
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    paths: {
        requestAnimationFrame: '.',
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
        engineDetector: 'bower_components/engineDetector/app',
        engine: 'bower_components/engineDetector/app/engine'
    }
} )


var isStandalone = !! requirejs._defined,
    synchronous = isStandalone

engine.ifNode(function(){

    synchronous = true

})

if ( synchronous ) { // case standalone

    var requestAnimationFrame = requirejs( 'requestAnimationFrame/requestAnimationFrame' )

    engine.exports( 'requestAnimationFrame', requestAnimationFrame )


} else {

    requirejs( [ 'requestAnimationFrame/requestAnimationFrame' ], function( requestAnimationFrame ) {
        engine.exports( 'requestAnimationFrame', requestAnimationFrame )
    } )

}
