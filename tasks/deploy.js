var Deployer = function( o ) {

    this.grunt = o.grunt
    this.config = this.grunt.mangroveConfig

    // console.log(this.grunt.mangroveConfig)
    this.ghPagesDeploy = this.config.get( 'deploy.gh_pages' )
    this.privateHostDeploy = this.config.get( 'deploy.private_host' )
    this.isPrivate = this.config.get( 'private' )

    this.setExecGruntConfig()
    this.skipBuild = this.grunt.option( 'skipBuild' )
    this.run()

}


Deployer.prototype = {

    setExecGruntConfig: function() {

        var command = this.grunt.config.process( 'rsync -e ssh -avzO ./dist/build/ cyril@mangrove.dk:/var/www/mangrove.dk/<%= config.name.raw %>' )

        this.grunt.config.set( 'exec.send', {
            command: command
        } )

    },

    run: function() {

        var tasks = []

        if ( ! this.isPrivate && this.ghPagesDeploy  )
            tasks.push( 'publish_gh_pages' )

        if ( this.privateHostDeploy )
            tasks.push( 'exec:send' )

        this.grunt.task.run( tasks )
    }

}

module.exports = function( grunt ) {

    grunt.registerTask( 'deploy', function() {

        new Deployer( {
            grunt: grunt
        } )

    } )

}