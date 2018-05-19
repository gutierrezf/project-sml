const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const DBInterfaceGenerator = require('./base-model');

const { Schema } = mongoose;

const contractorSchema = new Schema({
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  website: { type: String, default: '' },
  source: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

contractorSchema.plugin(findOrCreate);

const Contractor = mongoose.model('Contractor', contractorSchema);
const ContractorInterface = DBInterfaceGenerator.MongooseInterface(Contractor);

module.exports = {
  Contractor,
  ContractorInterface
};
