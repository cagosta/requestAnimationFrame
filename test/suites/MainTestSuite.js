define( [
    'requestAnimationFrame/requestAnimationFrame'
 ], function( requestAnimationFrame ) {

    describe( 'requestAnimationFrame/requestAnimationFrame', function() {

        it( 'should load without blowing', function() {

            expect( requestAnimationFrame ).to.exist

        } )

    } )

} )