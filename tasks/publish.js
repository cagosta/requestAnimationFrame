module.exports = function( grunt ) {

    var isPrivate = grunt.config.get( 'config.private' ),
        browserOnly = grunt.config.get( 'config.browserOnly' );


    if ( isPrivate ){
        return
    } // blocking if private module

    grunt.config.set( 'exec.bower_register', {
        command: 'bower register <%= config.name.raw %> git://github.com/<%= config.github.path %>'
    } )

    grunt.config.set( 'exec.npm_publish', {
        command: 'npm publish'
    } )

    grunt.registerTask( 'publish:bower', [ 'build', 'test', 'exec:bower_register' ] )

    grunt.registerTask( 'publish:npm', [ 'build', 'test', 'exec:npm_publish' ] )

    if ( browserOnly ){
        grunt.registerTask( 'publish', 'Publish on bower', [ 'test', 'exec:bower_register' ] )
    } else {
        grunt.registerTask( 'publish', 'Publish on bower and bpm', [ 'test', 'exec:bower_register', 'exec:npm_publish' ] )
    }

}