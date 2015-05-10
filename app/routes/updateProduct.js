var Product = require('../../models/product');

module.exports = function(req, res) {
  // eseguire la validazione lato middleware

  var fields = req.body.fields;

  var ProductToUpdate = new Product(fields);
  // eseguo la query sul db
  ProductToUpdate.update(function(err) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db update')});
        }

        return res.json({success: true});
      }
  );
};