/**
 * requestAnimationFrame version: "0.0.17" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/requestAnimationFrame for details
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 *
 */


( function() {



    if ( typeof window === 'undefined' )
        return

    if ( window.requestAnimationFrame )
        return window.requestAnimationFrame


    if ( window.webkitRequestAnimationFrame ) { // Chrome <= 23, Safari <= 6.1, Blackberry 10
        window.requestAnimationFrame = window[ 'webkitRequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ 'webkitCancelAnimationFrame' ] || window[ 'webkitCancelRequestAnimationFrame' ];
        return window.requestAnimationFrame
    }

    // IE <= 9, Android <= 4.3, very old/rare browsers

    var lastTime = 0;

    window.requestAnimationFrame = function( callback, element ) {

        var currTime = new Date().getTime();
        var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
        var id = window.setTimeout( function() {
                callback( currTime + timeToCall );
            },
            timeToCall );
        lastTime = currTime + timeToCall;
        return id; // return the id for cancellation capabilities
    };

    window.cancelAnimationFrame = function( id ) {
        clearTimeout( id );
    };

    if ( typeof define === 'function' ) {
        define( function() {
            return window.requestAnimationFrame;
        } )
    }

} )();