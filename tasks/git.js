module.exports = function( grunt ) {

    var isPrivate = grunt.config.get( 'config.private' )



    if ( !isPrivate ) {

        grunt.registerTask( 'git:add_origin', function() {

            grunt.config.set( 'exec.git_add_origin', {

                command: 'git remote add origin git@github.com:<%= config.github.user %>/<%= config.name.raw %>'

            } )

            grunt.task.run( 'exec:git_add_origin' )

        } )

        grunt.registerTask( 'git:push_set_upstream', function() {

            grunt.config.set( 'exec.git_set_upstream', {

                command: 'git push --set-upstream origin master'

            } )

            grunt.task.run( 'exec:git_set_upstream' )

        } )

        grunt.registerTask( 'git:create_remote_repo', function() {

            var curlCommand = grunt.config.process( 'curl -u \'<%= config.github.user %>\' https://api.github.com/user/repos -d \'{"name":"<%= config.name.raw %>"}\'' )

            grunt.config.set( 'exec.git_create_remote_repo', {
                command: curlCommand
            } )

            grunt.task.run( 'exec:git_create_remote_repo' )

        } )

    } else {

        grunt.registerTask( 'git:add_origin', function() {

            grunt.config.set( 'exec.git_add_origin', {

                command: 'git remote add origin git@<%= config.deploy.host %>:/home/git/<%= config.name.raw %>.git'

            } )

            grunt.task.run( 'exec:git_add_origin' )

        } )

        grunt.registerTask( 'git:create_remote_repo', function() {

            grunt.config.set( 'exec.create_remote_repo', {
                command: 'ssh git@<%= config.deploy.host %> "cd /home/git/ && mkdir <%= config.name.raw %>.git && cd <%= config.name.raw %>.git && git --bare init"'
            } )

            grunt.task.run( [ 'exec:create_remote_repo' ] )

        } )

    }

    grunt.config.set( 'exec.git_add_dist', {

        command: 'git add dist'

    } )

    grunt.registerTask( 'git:add_dist', [ 'exec:git_add_dist' ] )



    grunt.registerTask( 'git:initial_commit', function() {

        grunt.config.set( 'exec.git_initial_commit', {
            command: 'git add .; git commit -am "initial commit"'
        } )

        grunt.task.run( 'exec:git_initial_commit' )

    } )


    grunt.registerTask( 'git:init', function() {

        grunt.config.set( 'exec.gitInit', {
            command: 'git init'
        } )

        grunt.task.run( 'exec:gitInit' )

    } )


    grunt.registerTask( 'git:install', [ 'git:init', 'git:create_remote_repo', 'git:initial_commit', 'git:add_origin' ] )


}