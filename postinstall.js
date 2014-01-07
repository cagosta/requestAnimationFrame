// task uses to install bower dependencies via after npm postinstall
// grunt task not working since grunt should not be use in dependencies ( grunt.loadNpmTaskIssue )
// todo: find a better place for this


var bower = require( 'bower' )
console.log('Installing bower dependencies ... ')

bower.commands.install([]).on('end', function( ){

    console.log('Installed bower dependencies.')
    
})