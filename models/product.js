function Product(product) {
  this._id = product._id || undefined;
  this.name = product.name;
  this.sku = product.sku;
  this.price = product.price;
  this.description = product.description;
}

module.exports = Product;

Product.prototype.save = function(callback) {
  var product = {
    name: this.name,
    sku: this.sku,
    price: this.price,
    description: this.description
  };

  db.products.insert(product, function(err, product) {
    if (err) {
      return callback(err);
    }
    callback(null, new Product(product));
  });
};

Product.prototype.update = function(callback) {
  var product = {
    name: this.name,
    sku: this.sku,
    price: this.price,
    description: this.description
  };

  db.products.update({ _id: this._id }, { $set: product }, function(err, numReplaced) {
    if (err) {
      return callback(err);
    }
    callback(null, numReplaced);
  });
};

Product.getById = function(id, callback) {
  db.products.findOne({
    _id: id
  }, function(err, product) {
    if (err) {
      return callback(err);
    }
    callback(null, new Product(product));
  });
};

Product.getBySku = function(sku, callback) {
  db.products.findOne({
    sku: sku
  }, function(err, product) {
    if (err) {
      return callback(err);
    }
    callback(null, new Product(product));
  });
};

Product.getByName = function(name, callback) {
  db.products.findOne({
    name: name
  }, function(err, product) {
    if (err) {
      return callback(err);
    }
    callback(null, new Product(product));
  });
};

Product.getList = function(callback) {
  var query = {};
  //if (name) {
  //  query.name = name;
  //}
  db.products.find(query, function(err, docs) {
    if (err) {
      return callback(err);
    }
    var products = [];
    for (var i = 0; i < docs.length; i++) {
      var obj = docs[i];
      products.push(new Product(obj));
    }
    callback(null, products);
  });
};

Product.remove = function(_id, callback) {
  db.products.remove({
    _id: _id
  }, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};