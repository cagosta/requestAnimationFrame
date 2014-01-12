module.exports = function( grunt ) {

    grunt.config.set( 'gh-pages', {
        options: {
            base: 'dist/build',
            user: {
                name: '<%= config.github.user %>',
                email: '<%= config.author.email %>'
            },
            repo: 'git@github.com:<%= config.github.path %>'
        },
        src: [ '**' ]
    } )

    grunt.registerTask( 'publish_gh_pages', [ 'gh-pages' ] )

}