// task uses to install bower dependencies via after npm postinstall
// grunt task not working since grunt should not be use in dependencies ( grunt.loadNpmTaskIssue )
// todo: find a better place for this


var bower = require( 'bower' )
console.log( 'Installing bower dependencies ... ' )

bower.commands.install( [] ).on( 'end', function() {
    console.log( 'args', arguments )
    console.log( 'Installed bower dependencies.' )
    var util = require( 'util' ),
        exec = require( 'child_process' ).exec,
        child;

    child = exec( 'ls app/bower_components', // command line argument directly in string
        function( error, stdout, stderr ) { // one easy function to capture data/errors
            console.log( 'stdout: ' + stdout );
            console.log( 'stderr: ' + stderr );
            if ( error !== null ) {
                console.log( 'exec error: ' + error );
            }
        } );

} )