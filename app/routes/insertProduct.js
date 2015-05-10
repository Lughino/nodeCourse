var Product = require('../../models/product');

module.exports = function(req, res) {

  var newProduct = new Product(req.body);
  // eseguo la query sul db
  newProduct.save(function(err, doc) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db insert')});
        }

        return res.json({success: true, product: doc});
      }
  );
};