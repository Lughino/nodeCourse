var Category = require('../../models/category');

// http://localhost:3000/categories?filter=phone
module.exports = function(req, res) {

  Category.getList(req.query.filter || null,
      function(err, categories) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db find')});
        }

        return res.json(categories);
      }
  );
};