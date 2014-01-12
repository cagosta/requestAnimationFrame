module.exports = function( grunt ) {


    grunt.registerTask( 'postinstall', [ 'inject_rjsconfig', 'test:all' ] )


}