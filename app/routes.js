/**
 * @author Luca Pau <luca.pau82@gmail.com>
 */

var indexCtrl = require('./routes/index');

var categoryListCtrl = require('./routes/categoryList');
var getCategoryByIdCtrl = require('./routes/getCategoryById');
var insertCategoryCtrl = require('./routes/insertCategory');
var updateCategoryCtrl = require('./routes/updateCategory');
var deleteCategoryCtrl = require('./routes/deleteCategory');

var productListCtrl = require('./routes/productList');
var getProductBySkuCtrl = require('./routes/getProductBySku');
var getProductByIdCtrl = require('./routes/getProductById');
var insertProductCtrl = require('./routes/insertProduct');
var updateProductCtrl = require('./routes/updateProduct');
var deleteProductCtrl = require('./routes/deleteProduct');
var validatorProduct = require('./routes/helpers/validatorProductMiddleware');

module.exports = function(app) {
  app.get('/', indexCtrl);

  // attraverso il paradigma RESTful è possibile appendere i metodi alla stessa
  // rotta con express

  app.route('/api/v1/categories')
      .get(categoryListCtrl)
      .post(insertCategoryCtrl);

  app.route('/api/v1/categories/:id')
      .get(getCategoryByIdCtrl)
      .put(updateCategoryCtrl)
      .delete(deleteCategoryCtrl);

  app.route('/api/v1/products')
      .get(productListCtrl)
      .post(validatorProduct, insertProductCtrl);

  app.route('/api/v1/products/:id')
      .get(getProductByIdCtrl)
      .put(updateProductCtrl)
      .delete(deleteProductCtrl);

  app.get('/api/v1/products/:sku', getProductBySkuCtrl);
};