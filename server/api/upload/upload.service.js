/**
 * Created by akash on 8/4/16.
 */

var _ = require('lodash');
var Upload = require('./upload.model');

var Cloudinary = require('../../components/cloudinary/cloudinary');
var fs = require('fs');



// Get list of uploads(indexUpload/index)
exports.index = function(callback) {

  Upload.find(function (err, uploads) {

    callback(err,uploads);

  });
};

// Get a single upload(showUpload/show)
exports.show = function(id, callback) {

  Upload.findById(id, function (err, upload) {

    callback(err,upload);

  });
};

// Creates a new upload in the DB.(createUpload/create)
exports.create = function(userID, file, req, callback) {

  var data = {};
  data.userID = userID;

  Cloudinary.cloudinary(file, function (cloudData) {

    data.uploadUrl = cloudData.secure_url;
    data.uploadObject = cloudData;

    Upload.create(data, function(err, upload) {

      fs.unlink(file.path);
      callback(err, upload);

    });

  });

};

// Updates an existing upload in the DB.(updateUpload/update)
exports.update = function(req, callback) {
  if(req.body._id) { delete req.body._id; }
  Upload.findById(req.params.id, function (err, upload) {
    if(err){
      callback(err);
    }else{
      var updated = _.merge(upload, req.body);
      updated.save(function (err) {
        if (err) { callback(err)
        }else{
          callback(upload);
        }
      });
    }

  });
};

// Deletes a upload from the DB.(destroyUpload/destroy)
exports.destroy = function(id, callback) {
  Upload.findById(id, function (err, upload) {
    if(err) {
      callback(err);
    }else{
      upload.remove(function(err) {
        if(err) {
          callback(err);
        }else{
          callback(upload);
        }
      });
    }
  });
};

