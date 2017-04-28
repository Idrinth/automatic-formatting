fs = require ( "fs" );
prettier = require ( "prettier" );
fm = function ( dir ) {
    var files = fs.readdirSync ( dir );
    for (var pos = files.length - 1; pos >= 0; pos--) {
        var file = dir + '/' + files[pos];
        if ( fs.statSync ( file ).isDirectory () && !file.match ( /\.git$/ ) ) {
            fm ( file );
        } else if ( file.match ( /\.js$/ ) ) {
            var content = fs.readFileSync ( file ).toString ();
            if ( !prettier.check ( content ) ) {
                fs.writeFileSync ( file, prettier.format ( content ) );
            }
        }
    }
};
module.exports = fm;