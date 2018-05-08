'use strict';

const express = require('express');
const router = express.Router();
const co = require('co-express');
const provider = require('../main');
const constants = require('../constants');

router.get('/', co(function* (req, res, next ){
const shopName = req.query.shop;
  console.log('api');
  const emailObj = {
    to: ['ingutierrez.u@gmail.com'],
    subject: 'test email',
    body: '<p>form content</p>'
  }
  provider.mailer.send(emailObj.to, emailObj.subject, emailObj.body);

  res.render('home', {shopName:shopName});
}));

module.exports = router;