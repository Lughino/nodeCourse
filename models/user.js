function User(user) {
  this._id = user._id || undefined;
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

module.exports = User;

User.prototype.save = function(callback) {
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };
  db.users.insert(user, function(err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

User.prototype.update = function(callback) {
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };

  db.users.update({_id: this._id}, {$set: user}, function(err, numReplaced) {
    if (err) {
      return callback(err);
    }
    callback(null, numReplaced);
  });
};

User.getById = function(id, callback) {
  db.users.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, new User(user));
  });
};

User.getByEmail = function(email, callback) {
  db.users.findOne({
    name: name
  }, function(err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, new User(user));
  });
};

User.getList = function(callback) {
  var query = {};
  db.users.find(query, function(err, docs) {
    if (err) {
      return callback(err);
    }
    var users = [];
    for (var i = 0; i < docs.length; i++) {
      var obj = docs[i];
      users.push(new User(obj));
    }
    callback(null, users);
  });
};

User.remove = function(_id, callback) {
  db.users.remove({
    _id: _id
  }, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};