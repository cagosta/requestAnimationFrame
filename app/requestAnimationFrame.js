/**
 * requestAnimationFrame version: "0.0.13" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/requestAnimationFrame for details
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 *
 */


define( [
 ], function(  ) {
    
    if ( typeof window === 'undefined' )
        return 
    

    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if ( !window.requestAnimationFrame )
        window.requestAnimationFrame = function( callback, element ) {
            // console.log('called')
            var currTime = new Date().getTime();
            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
            var id = window.setTimeout( function() {
                    callback( currTime + timeToCall );
                },
                timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };

    if ( !window.cancelAnimationFrame )
        window.cancelAnimationFrame = function( id ) {
            clearTimeout( id );
        };

    return window.requestAnimationFrame;

} )