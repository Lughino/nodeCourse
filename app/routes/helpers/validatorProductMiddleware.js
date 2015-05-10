module.exports = function(req, res, next) {
  var fields = req.body;
  console.log(fields);

  // eseguo la validazione
  if (fields.sku == null || fields.sku.trim() == '') {
    return res.status(400).json({error: 'Param required' });
  }
  if (fields.productId == null || isNaN(fields.productId)) {
    return res.status(400).json({error: 'Param productId not valid' });
  }
  if (fields.name == null || fields.name.trim() == '') {
    return res.status(400).json({error: 'Param name not valid' });
  }
  if (fields.type == null || fields.type.trim() == '') {
    return res.status(400).json({error: 'Param type not valid' });
  }

  return next();
};