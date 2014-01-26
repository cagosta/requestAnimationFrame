var Builder = function( o ) {

    this.grunt = o.grunt
    this.config = this.grunt.config.get( 'config' )
    this.initializePaths()
    this.setRequirejsConfig()
    this.setCopyGruntConfig()
    this.setCopyToLatestGruntConfig()
    // this.setReplaceVersionGruntConfig()
    this.setGruntReplaceBuildPath()
    this.run()

}

Builder.prototype = {

    initializePaths: function() {

        this.basePath = 'dist'
        this.tempPath = [  this.basePath, 'temp' ].join( '/' ) + '/'
        this.moduleName = this.config.name.raw
        this.version = this.config.version
        this.separator = '-'
        this.latest = 'latest'
        this.min = 'min'
        this.amd = 'amd'
        this.standalone = 'standalone'
        this.fileType = '.js'

    },

    setGruntReplaceBuildPath: function() { // take app/index.html and inject mocha in it

        this.grunt.config.set( 'replace.build_path', {
            src: [ 'dist/build/index.html' ],
            dest: 'test/index_build.html',
            replacements: [
                { // add mocha stylesheet and div
                    from: /<\/head>[^<]+<body>/gi,
                    to: [ '<link rel="stylesheet" href="assets/mocha.css" />',
                            '</head>',
                            '<body>',
                            '<div id="mocha"></div>'
                        ].join( '\n' )
                },
                { // change data_main and add 
                    from: '<script data-main="main.js" src="bower_components/requirejs/require.js"></script>',
                    to: [ 
                        '<script data-main="test_main.js" src="../app/bower_components/requirejs/require.js"></script>',
                        '<script src="../dist/build/main.js"></script>'
                    ].join( '\n' )
                }
            ]
        } )

    },

    setCopyGruntConfig: function() {

        this.grunt.config.set( 'exec.compress_build', {
            command: 'zip -r dist/build/build.zip dist/build'
        } )

        this.grunt.config.set( 'copy.build', {
            files: [
                {
                    expand: true,
                    cwd: 'app/assets/',
                    src: [ '**' ],
                    dest: 'dist/build/assets/'
                },
                {
                    src: 'app/favicon.png',
                    dest: 'dist/build/favicon.png'
                },
                {
                    src: 'app/bower_components/requirejs/require.js',
                    dest: 'dist/build/bower_components/requirejs/require.js'
                },
                {
                    src: 'app/index.html',
                    dest: 'dist/build/index.html'
                },
                {
                    src: this.getBuildPath( this.getAmdMinFilename() ),
                    dest: 'dist/build/main.js'
                }
            ]
        } )
    },


    setCopyToLatestGruntConfig: function() {
        this.grunt.config.set( 'copy.build_to_latest', {
            files: [
                {
                    src: this.getStandalonePath(),
                    dest: this.getBuildPath( this.getStandaloneLatestFilename() )
                },
                {
                    src: this.getStandaloneMinPath(),
                    dest: this.getBuildPath( this.getStandaloneLatestMinFilename() )
                },
                {
                    src: this.getBuildPath( this.getAmdMinFilename() ),
                    dest: this.getBuildPath( this.getLatestAmdMinFilename() )
                }
            ]
        } )
    },

    getStandaloneFilename: function() {
        return [  this.moduleName, this.version, this.standalone, ].join( this.separator ) + this.fileType
    },

    getStandaloneMinFilename: function() {
        return [  this.moduleName, this.version, this.standalone, this.min ].join( this.separator ) + this.fileType
    },

    getStandaloneLatestFilename: function() {
        return [  this.moduleName, this.latest, this.standalone ].join( this.separator ) + this.fileType
    },

    getAmdMinFilename: function() {
        return [ this.moduleName, this.version, this.amd, this.min ].join( this.separator ) + this.fileType
    },

    getLatestAmdMinFilename: function() {
        return [  this.moduleName, this.latest, this.amd, this.min ].join( this.separator ) + this.fileType
    },

    getStandaloneLatestMinFilename: function() {
        return [  this.moduleName, this.latest, this.standalone, this.min ].join( this.separator ) + this.fileType
    },

    getBuildPath: function( relativePath ) {
        return [  this.basePath, relativePath ].join( '/' )
    },

    getStandalonePath: function() {
        return this.getBuildPath( this.getStandaloneFilename() )
    },

    getStandaloneMinPath: function() {
        return this.getBuildPath( this.getStandaloneMinFilename() )
    },

    log: function() {
        for ( var i in this )
            if ( this.hasOwnProperty( i ) )
                console.log( i, this[ i ] )
    },

    setRequirejsConfig: function() {

        this.mainConfigFile = 'app/main.js'
        this.name = '<%= config.name.raw %>/main'

        this.grunt.config.set( 'requirejs', {

            standalone: { // see https://github.com/jrburke/r.js/blob/master/build/example.build.js

                options: {
                    optimizeAllPluginResources: true,
                    mainConfigFile: this.mainConfigFile,
                    optimize: 'none',
                    wrap: true,
                    out: this.getStandalonePath(),
                    name: this.name,
                    include: [ 'bower_components/almond/almond' ]
                }

            },


            amdMin: {

                options: {
                    optimizeAllPluginResources: true,
                    mainConfigFile: this.mainConfigFile,
                    optimize: 'uglify2',
                    out: this.getBuildPath( this.getAmdMinFilename() ),
                    name: this.name
                }
            },

            standaloneMin: {

                options: {
                    optimizeAllPluginResources: true,
                    mainConfigFile: this.mainConfigFile,
                    optimize: 'uglify2',
                    out: this.getStandaloneMinPath(),
                    name: this.name,
                    include: [ 'bower_components/almond/almond' ]
                }
            }

        } )

    },

    run: function() {

        this.grunt.task.run( [
            'requirejs:standalone',
            'requirejs:standaloneMin',
            'requirejs:amdMin',
            'make_stylesheets',
            'copy:build',
            'copy:build_to_latest',
            'replace:build_path',
            'exec:compress_build'
        ] )

    }

}

module.exports = function( grunt ) {

    grunt.registerTask( 'build', function() {

        grunt.task.run( [ 'inject_rjsconfig' ] )

        new Builder( {
            grunt: grunt
        } )

    } )
}