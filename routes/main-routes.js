'use strict';

var express = require('express');
var router = express.Router();
var co = require('co-express');
var provider = require('../main');
var constants = require('../constants');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  console.log(req.originalUrl);
  next()
});

/****

 HOME TEMPLATE

****/

router.get('/', co(function* (req, res, next ){
  let shop = req.query.shop;
  if(shop) {
    shop = shop.split('.')[0];
  }
  else {
    res.redirect('/new');
    return;
  }

  let localShop = yield provider.db.shop.findByName(shop);

  if (localShop.accessToken.length <= 0) {
    res.redirect('/install?shop=' + shop);
    return;
  }
  res.render('home', { shopName: shop });
}));

/****

 INSTALL APP

****/
router.get('/install', co(function* (req, res, next ){

  // check for empty shop query???
  const shopName = req.query.shop;

  if (shopName == 'undefined') {
    res.redirect('/error');
    return;
  };


  yield provider.db.shop.findOrCreateShop({ companyName: shopName });
  const url = provider.service.authURL(shopName);
  // redirects to /authenticate
  res.redirect(url);

}));

/****

 AUTHENTICATE CALLBACK

****/
router.get('/authenticate', co(function* (req, res, next ){

  const token = yield provider.service.fetchAuthToken(req.query);
  let shopName = req.query.shop;
  shopName = shopName.split('.')[0];

  yield provider.db.shop.saveShopToken(token, shopName);

  res.redirect('/?shop='+shopName);
}));

/****

 NEW TEMPLATE

****/

router.get('/new', co(function* (req, res, next ){
  let shopName = req.query.shop;

  if(shopName) {
    res.redirect('./?shop='+shopName);
  }
  res.render('install-form', {shopName:shopName});
}));



module.exports = router;