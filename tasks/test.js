var SauceRunner = function( o ) {

    this.grunt = o.grunt
    this.task = o.task
    this.taskArg = o.taskArg ||  'default'



    this.browsers = this.grunt.config.get( 'config.test.saucelabs.browsers.' + this.taskArg )

    this.grunt.log.write( 'Running ' + this.taskArg + ' saucelabs tests on :' + JSON.stringify( this.browsers ) + ' ...' )

    this.grunt.config.set( 'saucelabs-mocha', { // see https://github.com/axemclion/grunt-saucelabs
        all: {
            options: {
                username: '<%= config.credentials.saucelabs.username %>', // if not provided it'll default to ENV SAUCE_USERNAME (if applicable)
                key: '<%= config.credentials.saucelabs.key %>', // if not provided it'll default to ENV SAUCE_ACCESS_KEY (if applicable)
                urls: [ 'http://localhost:<%= config.server.port %>/test/index_build.html' ],
                concurrency: 2,
                // concurrency: 'Number of concurrent browsers to test against. Will default to the number of overall browsers specified. Check your plan (free: 2, OSS: 3) and make sure you have got sufficient Sauce Labs concurrency.',
                // tunneled: 'true (default) / false; false if you choose to skip creating a Sauce connect tunnel.',
                // tunnelTimeout: 'A numeric value indicating the time to wait before closing all tunnels',
                // testTimeout: 'Milliseconds to wait before timeout for qunit test per page',
                // testInterval: 'Milliseconds between retries to check if the tests are completed',
                testReadyTimeout: 20 * 1000, //'Milliseconds to wait until the test-page is ready to be read',
                // detailedError: 'false (default) / true; if true log detailed test results when a test error occurs',
                detailedError: true,
                testname: '<%= config.name.raw %>#<%= config.version %>',
                // tags: [ 'Array of tags' ],
                browsers: this.browsers,
                onTestComplete: function() {
                    // Called after a qunit unit is done, per page, per browser
                    // Return true or false, passes or fails the test
                    // Returning undefined does not alter the test result

                    // For async return, call
                    // var done = this.async();
                    // done( true or false changes the test result, undefined does not alter the result);
                }
            }
        }
    } )

    this.grunt.task.run( [ 'server:test', 'build', 'saucelabs-mocha' ] )

}



module.exports = function( grunt ) {


    grunt.registerTask( 'test:sauce', function( taskArg ) {

        new SauceRunner( {
            grunt: grunt,
            task: this,
            taskArg: taskArg
        } )

    } )

    grunt.config.set( 'exec.headless_test', {

        command: './node_modules/.bin/mocha-phantomjs --path ./node_modules/.bin/phantomjs test/index.html'

    } )

    grunt.config.set( 'exec.node_test', {

        command: 'node test/test_main.js'

    } )

    grunt.registerTask( 'test:headless', 'Run tests in the browser', [
        'exec:headless_test'
    ] )

    grunt.registerTask( 'test:node', 'Run tests with node', [
        'exec:node_test'
    ] )

    grunt.registerTask( 'test:all', 'Run tests in all environements', [
        'test:node',
        'test:headless'
    ] )


    grunt.registerTask( 'test:browser', 'Run tests with phantomjs', [
        'inject_rjsconfig',
        'open:test_page'
    ] )

    grunt.registerTask( 'test', function( options ) {

        options = options ||  'headless'

        grunt.task.run( [ 'test:' + options ] )

    } )

}