var crypto = require('crypto'),
    Admin = require('../models/admin'),
    Member = require('../models/member'),
    Product = require('../models/product'),
    Category = require('../models/category'),
    ShoppingCart = require('../models/shoppingcart');

module.exports = function(app) {
  app.get('/system/login', function(req, res) {
    res.render('system/login', {
      title: 'Admin page',
      admin: req.session.admin,
      success: '',
      error: ''
    });
  });

  app.post('/system/login', function(req, res) {
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    Admin.get(req.body.name, function(err, admin) {
      if (!admin) {
        return res.redirect('/system/login');
      }
      if (admin.password != password) {
        return res.redirect('/system/login');
      }
      req.session.admin = admin;
      res.redirect('/system/index');
    });
  });
  app.get('/system/index', checkAdminLogin, function(req, res) {
    res.render('system/index', {
      title: 'index',
      admin: req.session.admin,
      success: '',
      error: ''
    });
  });
  app.get('/system/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/system/login');
  });

  app.get('/system/member', checkAdminLogin, function(req, res) {
    Member.getList(null, function(err, members) {
      if (err) {
        members = [];
      }
      res.render('system/member', {
        title: 'member',
        admin: req.session.admin,
        members: members,
        success: '',
        error: ''
      });
    });
  });

  app.get('/system/member_remove/:_id', checkAdminLogin, function(req, res) {
    Member.remove(req.params._id, function(err) {
      if (err) {
        return res.redirect('back');
      }
      res.redirect('/system/member');
    });
  });

  app.get('/system/product_index', checkAdminLogin, function(req, res) {
    Product.getList(null, function(err, products) {
      if (err) {
        products = [];
      }
      res.render('system/product_index', {
        title: 'product',
        products: products,
        success: '',
        error: ''
      });
    });
  });

  app.get('/system/product_add', checkAdminLogin, function(req, res) {
    res.render('system/product_add', {
      title: 'add product',
      success: '',
      error: ''
    });
  });

  app.post('/system/product_add', checkAdminLogin, function(req, res) {
    var newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    });
    Product.get(newProduct.name, function(err, product) {
      if (product) {
        return res.redirect('/system/product_add');
      }
      newProduct.save(function(err, product) {
        if (err) {
          return res.redirect('/system/product_add');
        }
        res.redirect('/system/product_add');
      });
    });
  });

  app.get('/system/product_remove/:_id', checkAdminLogin, function(req, res) {
    Product.remove(req.params._id, function(err) {
      if (err) {
        return res.redirect('back');
      }
      res.redirect('/system/product_index');
    });
  });

  app.get('/system/category_index', checkAdminLogin, function(req, res) {
    Category.getList(null, function(err, categorys) {
      if (err) {
        categorys = [];
      }
      res.render('system/category_index', {
        title: 'category',
        categorys: categorys,
        success: '',
        error: ''
      });
    });
  });

  app.get('/system/category_add', checkAdminLogin, function(req, res) {
    res.render('system/category_add', {
      title: 'add category'
    });
  });

  app.post('/system/category_add', checkAdminLogin, function(req, res) {
    var newCategory = new Category({
      name: req.body.name
    });
    Category.get(newCategory.name, function(err, category) {
      if (category) {
        return res.redirect('/system/category_add');
      }
      newCategory.save(function(err, category) {
        if (err) {
          return res.redirect('/system/category_add');
        }
        res.redirect('/system/category_add');
      });
    });
  });

  app.get('/system/category_remove/:_id', function(req, res) {
    Category.remove(req.params._id, function(err) {
      if (err) {
        return res.redirect('back');
      }
      res.redirect('/system/category_index');
    })
  });

  app.get('/', function(req, res) {
    Product.getList(null, function(err, products) {
      if (err) {
        products = [];
      }
      res.render('index', {
        title: 'index',
        products: products,
        member: req.session.member,
        success: '',
        error: ''
      });
    });
  });

  app.get('/detail/:_id', function(req, res) {
    Product.getOne(req.params._id, function(err, product) {
      if (err) {
        return res.redirect('/');
      }
      res.render('detail', {
        product: product,
        member: req.session.member,
        success: '',
        error: ''
      });
    });
  });

  app.post("/addToCart", checkLogin, function(req, res) {
    var newShoppingCart = new ShoppingCart({
      uid: req.body.uid,
      pid: req.body.pid,
      count: req.body.count
    });
    newShoppingCart.save(function(err) {
      if (err) {
        return res.redirect('/');
      }
      res.redirect('/');
    });
  });

  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'signup',
      member: req.session.member,
      success: '',
      error: ''
    });
  });

  app.post('/signup', function(req, res) {
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    Member.get(req.body.name, function(err, member) {
      if (!member) {
        return res.redirect('/signup');
      }
      if (member.password != password) {
        return res.redirect('/signup');
      }
      req.session.member = member;
      res.redirect('/');
    });
  });

  app.get('/reg', function(req, res) {
    res.render('reg', {
      title: 'registration',
      member: req.session.member,
      success: '',
      error: ''
    });
  });
  app.post('/reg', function(req, res) {
    var password = req.body.password,
        re_password = req.body.re_password;
    if (re_password != password) {
      return res.redirect('/reg');
    }
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newMember = new Member({
      name: req.body.name,
      password: password,
      email: req.body.email
    });
    Member.get(newMember.name, function(err, member) {
      if (member) {
        return res.redirect('/reg');
      }

      newMember.save(function(err, member) {
        if (err) {
          return res.redirect('/reg');
        }
        req.session.member = member;
        res.redirect('/');
      });
    });
  });

  app.get('/logout', function(req, res) {
    req.session.member = null;
    res.redirect('/signup');
  });

  app.get('/info', checkLogin, function(req, res) {
    res.render('info', {
      title: 'info',
      member: req.session.member,
      success: '',
      error: ''
    });
  });
  app.post('/info', function(req, res) {
    res.redirect('/order');
  });
  app.get('/cart', function(req, res) {
    res.render('cart', {
      title: 'cart',
      member: req.session.member,
      success: '',
      error: ''
    });
  });
  app.get('/order', checkLogin, function(req, res) {
    res.render('order', {
      title: 'order',
      member: req.session.member,
      success: '',
      error: ''
    });
  });

  function checkLogin(req, res, next) {
    if (!req.session.member) {
      res.redirect('/signup');
    }
    next();
  }

  function checkAdminLogin(req, res, next) {
    if (!req.session.admin) {
      res.redirect('/system/login');
    }
    next();
  }
};
