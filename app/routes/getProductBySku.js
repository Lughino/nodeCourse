var Product = require('../../models/product');

module.exports = function(req, res) {

  // eseguo la validazione
  if (req.params.sku == null || req.params.sku.trim() == '') {
    return res.status(400).json({error: 'Param required'});
  }

  // eseguo la query sul db
  Product.getBySku(req.params.sku,
      function(err, product) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db find')});
        }

        return res.json(product);
      }
  );
};