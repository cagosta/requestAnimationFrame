module.exports = function( grunt ) {

    var bower = require( 'bower' )

    grunt.registerTask( 'bower_install', function() {
        var done = this.async()
        bower.commands.install([]).on('end', function( ){
            done()
        })
    } )

    grunt.registerTask( 'postinstall', 'Bower install and inject R.js config in main files.', [
        'bower_install',
        'inject_rjsconfig'
    ] )


}