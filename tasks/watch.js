module.exports = function( grunt ) {

    grunt.config.set( 'watch', {

        options: {
            nospawn: true,
            livereload: grunt.config.get( 'config.livereloadPort' )
        },

        make_stylesheets: {

            files: '**/*.styl',
            tasks: [
                    'make_stylesheets'
                ],
            options: {
                'event': 'all',
                atBegin: true
            }
        },

        livereload: {
            files: [
                    'app/*',
                    'config.json'
                ],
            tasks: [ 'build' ]
        }

    } )

}