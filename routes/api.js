const express = require('express');
const provider = require('../main');

const router = express.Router();

router.get('/', (req, res, next) => {
  const shopName = req.query.shop;

  res.render('home', { shopName });
});

module.exports = router;
