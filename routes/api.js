const express = require('express');
const provider = require('../main');

const router = express.Router();

router.get('/', (req, res, next) => {
  const shopName = req.query.shop;
  console.log('api');
  const emailObj = {
    to: ['ingutierrez.u@gmail.com'],
    subject: 'test email',
    body: '<p>form content</p>'
  };
  provider.mailer.send(emailObj.to, emailObj.subject, emailObj.body);

  res.render('home', { shopName });
});

module.exports = router;
