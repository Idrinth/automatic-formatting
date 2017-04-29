fs = require ( "fs" );
prettier = require ( "prettier" );
function sleep(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}
fm = function ( dir ,base) {
    base=base?base:dir;
    var files = fs.readdirSync ( dir );
    var modified = [];
    for (var pos = files.length - 1; pos >= 0; pos--) {
        var file = dir + '/' + files[pos];
        if ( fs.statSync ( file ).isDirectory () && !file.match ( /\.git$/ ) ) {
            modified.concat(fm ( file, base ));
        } else if ( file.match ( /\.js$/ ) ) {
            var content = fs.readFileSync ( file ).toString ();
            if ( !prettier.check ( content ) ) {
                fs.writeFileSync ( file, prettier.format ( content ) );
                while(!prettier.check ( fs.readFileSync ( file ).toString () )) {
                    sleep(2);
                }
                modified.push(file.replace (new RegExp("^"+base.replace(/\//,'\/')+'\/'),''));
            }
        }
    }
    sleep(1);
    return modified;
};
module.exports = fm;