/**
 * Created by akash on 8/4/16.
 */

var _ = require('lodash');
var Upload = require('./upload.model');

var Cloudinary = require('../../components/cloudinary/cloudinary');
var fs = require('fs');



// Get list of uploads(indexUpload/index)
exports.index = function(criteria, callback) {

  Upload.find(criteria,function (err, uploads) {

    callback(err,uploads);

  }).sort({dateCreated:'-1'});
};

// Get a single upload(showUpload/show)
exports.show = function(id, callback) {

  Upload.findById(id, function (err, upload) {

    callback(err,upload);

  });
};

// Creates a new upload in the DB.(createUpload/create)
exports.create = function(userID, file, callback) {

  var data = {};
  data.userID = userID;

  if(file){
    data.uploadUrl = '/static-image/'+file.filename;
    data.file = file;
  }

  Upload.create(data, function(err, upload) {

    callback(err, upload);

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

      fs.unlink(upload.file.path);
      upload.remove(function(err) {

        if(err) {

          callback(err, null);

        }else{

          callback(null,upload);

        }
      });
    }
  });
};

