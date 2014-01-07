module.exports = function( grunt ) {


    grunt.config.set( 'jsdoc', {
        dist: {
            src: [ 'app/**.js', 'README.md' ],
            options: {
                destination: 'documentation',
                configure: 'documentation/jsdoc.conf.json',
                template: 'node_modules/ink-docstrap/template'
            }
        }
    } )

    grunt.registerTask( 'generate_doc', [ 'jsdoc' ] )

}