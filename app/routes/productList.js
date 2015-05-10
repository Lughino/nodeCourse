var Product = require('../../models/product');

// http://localhost:3000/products?category=phone
module.exports = function(req, res) {

  // esercizio: modificare in modo da avere la possibilità di filtrare i prodotti
  // le operazioni da eseguire sono:
  // * modificare il modello in modo da creare l'associazione
  // * integrare la possibilità di accettare il filtro per categoria
  // * eseguire la query alla categoria e successivamente al prodotto
  //   (esempio esplicativo per poter visionare i vari modi di gestire le operazioni asincrone [async, q])

  //if (req.query.category == null || req.query.category.trim() == '') {
  //  return res.json({});
  //}

  //var category = req.query.category.trim();

  Product.getList(function(err, products) {
        if (err) {
          return res.status(500).json({error: new Error('Error in db find')});
        }

        return res.json(products);
      }
  );
};