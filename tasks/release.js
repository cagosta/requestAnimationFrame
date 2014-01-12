var Releaser = function( o ) {
    this.grunt = o.grunt
    this.gruntOptions = o.gruntOptions
    this.gruntOptions = this.gruntOptions ? ':' + this.gruntOptions : ''

    this.grunt.config.set( 'exec.npm_publish', {
        command: 'npm publish'
    } )

    this.isPrivate = !! this.grunt.config.get( 'config.private' )
    this.browserOnly = !! this.grunt.config.get( 'config.browserOnly' )
    this.doPush = !this.isPrivate

    this.grunt.config.set( 'bump.options', {
        files: [ 'package.json', 'bower.json', 'app/<%= config.name.raw %>.js' ],
        updateConfigs: [ 'config' ],
        commit: true,
        commitMessage: 'Releasing v%VERSION%',
        commitFiles: [ 'package.json', 'bower.json', 'app/<%= config.name.raw %>.js', 'dist', 'test/index_build.html' ], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: this.doPush,
        pushTo: 'origin master'
    } )

    this.run()
}


Releaser.prototype = {

    run: function() {
        this.runBumpVersion()
        this.runBuildAndTests()
        this.grunt.task.run( [ 'git:add_dist' ] )
        this.push()
    },

    runBumpVersion: function() {
        this.grunt.task.run( [ 'bump-only' + this.gruntOptions ] )
    },

    runBuildAndTests: function() {
        this.grunt.task.run( [ 'build', 'test' ] )
    },

    push: function() {
        if ( this.isPrivate || this.browserOnly ) {
            this.grunt.task.run( [ 'bump-commit' ] )
        } else {
            this.grunt.task.run( [ 'bump-commit', 'exec:npm_publish' ] )
        }
    }


}

module.exports = function( grunt ) {


    grunt.registerTask( 'release', function( options ) {

        new Releaser( {
            grunt: grunt,
            gruntOptions: options
        } )

    } )


}