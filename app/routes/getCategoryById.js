var Category = require('../../models/category');

module.exports = function(req, res) {

  var id = parseInt(req.params.id);

  // eseguo la validazione
  if (id == null || isNaN(id)) {
    return res.status(400).json({error: 'Param id required'});
  }

  Category.getById(id,
      function(err, category) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db find')});
        }

        return res.json(category);
      }
  );
};