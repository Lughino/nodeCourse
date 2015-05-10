var controller = function(req, res) {
  // inserire il caricamento dei prodotti.

  res.render('index', {
    'title': 'Course Node Shop',
    'user': req.user,
    'products': []
  });
};

module.exports = controller;
