var StylesheetMaker = function( o ) {

    this.grunt = o.grunt
    this.config = this.grunt.config

    this.initializePath()
    this.initializeGruntStylusConfig()
    
    this.setGruntStylusConfig()
    this.run()
}


StylesheetMaker.prototype = {

    initializePath: function() {

        this.path = {
            app: 'app',
            assets: 'assets',
            stylesheets: 'stylesheets',
            stylusFilename: this.config.get( 'config.name.raw' ) + '.styl',
            cssFilename: this.config.get( 'config.name.raw' ) + '.css'
        }

        this.path.stylusSource = [
            this.path.app,
            this.path.assets,
            this.path.stylesheets,
            this.path.stylusFilename
        ].join( '/' )
        this.path.cssTarget = [
            this.path.app,
            this.path.assets,
            this.path.stylesheets,
            this.path.cssFilename
        ].join( '/' )
    },

    setGruntStylusConfig: function() {
 
        this.grunt.config.set( 'stylus.make_stylesheets', {
            options: {
                'include css': true,
                urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                define: {
                    assets_host: "../..",
                    environement: "production"
                }
            },
            files: this.gruntStylusConfig.files
        } )

    },

    initializeGruntStylusConfig: function() {
        this.gruntStylusConfig = {
            files: {}
        }
        this.gruntStylusConfig.files[ this.path.cssTarget ] = this.path.stylusSource
    },


    run: function() {
        this.grunt.task.run( [ 'stylus:make_stylesheets' ] )
    },


    log: function() {
        console.log( this.path )
    }

}


module.exports = function( grunt ) {

    grunt.registerTask( 'make_stylesheets', function() {
        new StylesheetMaker( {
            grunt: grunt
        } )

    } )

}