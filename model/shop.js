'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let findOrCreate = require('mongoose-findorcreate');
let DBInterfaceGenerator = require("./base-model");
let constants = require('../constants');


mongoose.connect(constants.DB_URL, {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  reconnectTries: 30,
  useMongoClient: true
});

let shopSchema = new Schema({
  companyName: String,
  accessToken: { type: String, default: ''},
  email: [String],
  uninstalledAt: Date,
  created_at: { type: Date, default: Date.now }
});

shopSchema.plugin(findOrCreate);

let Shop =  mongoose.model('Shop', shopSchema);
let ShopInterface = DBInterfaceGenerator.MongooseInterface(Shop);

ShopInterface.findByName = function(shopName){
  return this.findOne({ companyName : shopName });
}

ShopInterface.saveShopToken = function(token, shopName){
  return this.updateAll(
    { companyName : shopName },
    { accessToken: token }
  );
}

module.exports = {
  Shop,
  ShopInterface
};
