var fs = require('fs');

fs.open(
    'info.txt', 'r',
    function(err, handle) {
      var buf = new Buffer(100000);

      // il contenuto del file è valorizzato dentro l'argomento 'handle' della funzione di callback

      fs.read(
          handle, buf, 0, 100000, null,
          function(err, length) {
            console.log(buf.toString('utf8', 0, length));
            fs.close(handle, function() { /*  */
            });
          }
      );
    }
);