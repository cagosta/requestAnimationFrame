module.exports = function( grunt ) {

    grunt.config.set( 'watch', {

        options: {
        },

        make_stylesheets: { 

            files: 'app/assets/stylesheets/*.styl',
            tasks: [
                    'make_stylesheets'
                ],
            options: {
                spawn: false
            }
        }

    } )

}