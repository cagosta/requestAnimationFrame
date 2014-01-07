module.exports = function( grunt ) {

    var lrSnippet = require( 'connect-livereload' )( {
        port: grunt.config.get( 'config.livereloadPort' ),
    } ),
        mountFolder = function( connect, dir ) {
            return connect.static( require( 'path' ).resolve( dir ) )
        };

    grunt.config.set( 'connect', {

        options: {
            port: '<%= config.server.port %>',
            hostname: 'localhost' // change this to '0.0.0.0' to access the server from outside
        },

        test: {},

        livereload: {
            options: {
                middleware: function( connect ) {
                    return [
                        lrSnippet,
                        mountFolder( connect, '.' )
                        ]
                }
            }
        }
    } )


    grunt.registerTask( 'server:development', [
        'connect:livereload',
        'open:test_page',
        'watch'
    ] )

    grunt.registerTask( 'server', [ 'server:development' ] )

    grunt.registerTask( 'server:test', [
        'connect:test'
    ] )

}