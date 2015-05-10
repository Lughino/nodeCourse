var Category = require('../../models/category');

module.exports = function(req, res) {
  var id = parseInt(req.params.id);

  // eseguo la validazione
  if (id == null || isNaN(id)) {
    return res.status(400).json({error: 'Param id required'});
  }

  // eseguo la query sul db
  Category.remove(id,
      function(err, doc) {
        if (err) {
          return res.status(500)
              .json({error: new Error('Error in db remove')});
        }
        return res.json({success: true});
      }
  );
};