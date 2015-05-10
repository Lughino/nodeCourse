function Category(category) {
  this._id = category._id || undefined;
  this.name = category.name;
}

module.exports = Category;


Category.prototype.save = function(callback) {
  var category = {
    name: this.name
  };

  db.categories.insert(category, function(err, category) {
    if (err) {
      return callback(err);
    }
    callback(null, new Category(category));
  });
};

Category.prototype.update = function(callback) {
  var category = {
    name: this.name
  };

  db.categories.update({ _id: this._id }, { $set: category }, function(err, numReplaced) {
    if (err) {
      return callback(err);
    }
    callback(null, numReplaced);
  });
};

Category.getById = function(id, callback) {
  db.categories.findOne({
    _id: id
  }, function(err, category) {
    if (err) {
      return callback(err);
    }
    callback(null, new Category(category));
  });
};

Category.getByName = function(name, callback) {
  db.categories.findOne({
    name: name
  }, function(err, category) {
    if (err) {
      return callback(err);
    }
    callback(null, new Category(category));
  });
};

Category.getList = function(name, callback) {
  var query = {};
  if (name) {
    query.name = name;
  }
  db.categories.find(query, function(err, docs) {
    if (err) {
      return callback(err);
    }
    var categories = [];
    for (var i = 0; i < docs.length; i++) {
      var obj = docs[i];
      categories.push(new Category(obj));
    }
    callback(null, categories);
  });
};

Category.remove = function(_id, callback) {
  db.categories.remove({
    _id: _id
  }, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};