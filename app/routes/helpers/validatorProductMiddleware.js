module.exports = function(req, res, next) {
  var fields = req.body;
  console.log(fields);

  // eseguo la validazione
  if (fields.sku == null || fields.sku.trim() == '') {
    return res.status(400).json({error: 'Param required' });
  }
  if (fields.name == null || fields.name.trim() == '') {
    return res.status(400).json({error: 'Param name not valid' });
  }
  if (fields.description == null || fields.description.trim() == '') {
    return res.status(400).json({error: 'Param description not valid' });
  }
  if (fields.price == null) {
    return res.status(400).json({error: 'Param price not valid' });
  }

  return next();
};