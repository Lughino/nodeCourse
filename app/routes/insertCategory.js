var Category = require('../../models/category');

module.exports = function(req, res) {

  // occorre costruire un middleware per la validazione dei campi in modo che arrivino al controller solo se sono già validati e sanitizzati
  // appendere i camp validati in req.bodyValidated

  var newCategory = new Category(req.body);
  // eseguo la query sul db
  newCategory.save(function(err, doc) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db insert')});
        }

        return res.json({success: true, category: doc});
      }
  );
};