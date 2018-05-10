const express = require('express');
const co = require('co-express');
const provider = require('../main');
const jade = require('jade');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const emailTemplate = fs.readFileSync(path.join(__dirname, '/../views/mail-template.jade'), 'utf8');

router.post('/price-submit', co(function * (req, res, next) {
  const shopName = req.query.shop;
  const formData = req.body;
  const html = jade.compile(emailTemplate, { basedir: __dirname })({ formData });
  const localShop = yield provider.db.shop.findByName(shopName);

  const emailObj = {
    to: localShop.email,
    subject: 'Price Request',
    body: html
  };

  provider.mailer.send(emailObj.to, emailObj.subject, emailObj.body);
  res.send('ok');
}));

router.get('/email-view-test', (req, res, next) => {
  const formData = {
    'product-id': '766583472224',
    'product-title': 'AC1321',
    fullname: 'name test',
    email: 'email@test.com',
    message: 'atalog Number AC1321, Brand General Electric, Bus Plugs Fusible , Volts 240, Amps 30, Ground Stab No.'
  };

  const html = jade.compile(emailTemplate, { basedir: __dirname })({ formData });
  res.send(html);
});

module.exports = router;
