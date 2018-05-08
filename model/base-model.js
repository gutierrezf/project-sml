'use strict';

var Promise = require('promise');
var Base = {};


exports.MongooseInterface = function(model) {
  let obj = Object.assign({}, Base);
  obj.model = model;
  return obj;
}

Base.getModel = function(queryOptions) {
  return this.model;
}

Base.findOrCreate = function(queryOptions){
  let model = this.getModel();
  queryOptions = queryOptions || {};
  return new Promise(function(success, reject) {
    model.findOrCreate(queryOptions, function(err, data) {
      if (err) {
        reject(err);
      } else {
        success(data);
      }
    });
  });
}

Base.save = function(data){
  let model = this.getModel();
  return new Promise(function(success, reject) {
    model.create(data, function(err, data) {
      if (err) {
        reject(err);
      } else {
        success(data);
      }
    });
  });
}

Base.findOne = function(query){
  let model = this.getModel();
  return new Promise(function(success, reject) {
    model.findOne(query, function(err, data) {
      if (err) {
        reject(err);
      } else {
        success(data);
      }
    });
  });
}

Base.findById = function(id){
  let model = this.getModel();
  return new Promise(function(success, reject) {
    model.findById(id, function(err, data) {
      if (err) {
        reject(err);
      } else {
        success(data);
      }
    });
  });
}


Base.find =  function(queryOptions, sortOptions){
  let model = this.getModel();
  queryOptions = queryOptions || {};
  sortOptions = sortOptions || {created_at: -1};
  return new Promise(function(success, reject) {
    let query = model.find(queryOptions);
    query = model.find(queryOptions);
    query.sort(sortOptions);
    query.exec( function(err, data) {
      if (err) {
        reject(err);
      } else {
        success(data);
      }
    });
  });
}

Base.update =  function(data) {
  let model = this.getModel();
  let id = data._id;
  return new Promise(function(success, reject) {
    model.findByIdAndUpdate(id, data, {new: false}, function(err, model){
      if (err) {
        reject(err);
      } else {
        success(model);
      }
    });
  });
}

Base.updateAll =  function(query, data) {
  query = query || {};
  data = data || {};
  let model = this.getModel();
  return new Promise(function(success, reject) {
    model.update(query, data, {multi: true}, function(err, model){
      if (err) {
        reject(err);
      } else {
        success(model);
      }
    });
  });
}

Base.delete =  function(query) {
  let model = this.getModel();
  return new Promise(function(success, reject) {
    model.remove(query, function(err){
      if (err) {
        reject(err);
      }
      success("sucess");
    });
  });
}