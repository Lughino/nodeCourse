// in realtà NODE mette a disposizione delle API che eseguono delle operazioni sincrone
// Sono da adottare quando si lanciano dei worker che non generino un freeze del webserver

var fs = require('fs');

var handle = fs.openSync('info.txt', 'r');
var buf = new Buffer(100000);
var read = fs.readSync(handle, buf, 0, 10000, null);
console.log(buf.toString('utf8', 0, read));
fs.closeSync(handle);