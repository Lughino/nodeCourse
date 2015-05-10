var Category = require('../../models/category');

module.exports = function(req, res) {

  // eseguire la validazione lato middleware

  var fields = req.body.fields;

  var CategoryToUpdate = new Category(fields);
  // eseguo la query sul db
  CategoryToUpdate.update(function(err) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db update')});
        }

        return res.json({success: true});
      }
  );
};