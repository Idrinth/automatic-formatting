fs = require ( "fs" );
prettier = require ( "prettier" );
format = require("./config").prettier;
function sleep(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}
fm = function ( dir ,base) {
    base=base?base:dir;
    require("./if-debug")("formatting:"+dir+" of "+base);
    var files = fs.readdirSync ( dir );
    var modified = [];
    for (var pos = files.length - 1; pos >= 0; pos--) {
        var file = dir + '/' + files[pos];
        if ( fs.statSync ( file ).isDirectory () && !file.match ( /\.git$/ ) ) {
            modified.concat(fm ( file, base ));
        } else if ( file.match ( /\.js$/ ) ) {
            var content = fs.readFileSync ( file ).toString ();
            if ( !prettier.check ( content,format ) ) {
                content = prettier.format ( content,format)
                fs.writeFileSync ( file, content );
                while(!prettier.check ( fs.readFileSync ( file).toString () )) {
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