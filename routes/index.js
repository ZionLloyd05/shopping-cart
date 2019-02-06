var express = require('express');
var router = express.Router();
var Products = require('../models/product');
var Cart = require('../models/cart');


/* GET home page. */
router.get('/', function(req, res, next) {
  Products.find(function(err, docs){
    var productChunck = [];
    var chunckSize = 3;
    for(var i = 0; i < docs.length; i += chunckSize){
      productChunck.push(docs.slice(i, i + chunckSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunck});
  });
});

router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  //checking if a cart already exist in the session
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Products.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }

  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
})
module.exports = router;
