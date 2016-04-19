/**
 * Created by akash on 18/4/16.
 */


'use strict';

var _ = require('lodash');
var Transform = require('./transform.model');
var Upload = require('../upload/upload.model');
var fs = require('fs');

var easyImage = require('easyimage');
//var uploadImageService = require('../../../client/app/uploadImage/uploadImage.service');


// Get list of transform(indexTransform/index)
exports.index = function(criteria, callback) {

  Transform.find(criteria,function (err, transforms) {

    callback(err,transforms);

  }).sort({dateCreated:'-1'});
};


// Get a single transform(showTransform/show)
exports.show = function(criteria, callback) {

  Transform.find(criteria, function (err, transform) {

    if (err) {
      callback(err, null);
    }
    else if (transform.length === 0) {
      console.log("here processing happens ..... ");

      var uploadID = criteria.uploadID;
      var w = criteria.settings.width;
      var h = criteria.settings.height;
      var q = criteria.settings.quality;
      var format = criteria.settings.ext;
      var destination = '/home/akash/WebstormProjects/ImageProcessing/transformingPicture/';
      var options = {};
      var uploadedImage = [];

      var url = '';
      var index = null;
      var index2 = null;
      var fileName = '';
      var source = '';

      Upload.findById(uploadID, function (err, upload) {
        if (err) {
          callback(err, null);
        }else {
          uploadedImage = upload;
          console.log("upload Image(url) in transform service ....",uploadedImage);

          url = uploadedImage.file.path;
          index = url.lastIndexOf('/');
          index2 = url.lastIndexOf('.');
          fileName = url.substring(index+1,index2);

          source = uploadedImage.file.path;

          console.log('file name ..... ',fileName);
          console.log('file source ..... ',source);



          if(w != undefined){
            options.width = w;
          }
          if(h != undefined){
            options.height = h;
          }
          if(q != undefined){
            options.quality = q;
          }

          options.src = source;
          options.dst = destination+fileName+'.'+format;

          console.log('outside source ..... ',options.src);
          console.log('outside destination ..... ',options.dst);

          console.log('outside easyImage.convert');

          easyImage.convert(options).then(function(result) {

            console.log('inside easyImage.convert');

            if (!result) callback({err : 'err in processing'}, null);


            console.log('Image format Converted .... ',result);

            callback(null, result);

          });




        }
      });



    }else{
      callback(null, transform);
    }
  });
}


// Creates a new transform in the DB.(createTransform/create)
    exports.create = function(criteria, file, callback) {


      if(file){
        criteria.transformUrl = '/transform-image/'+file.filename;
        criteria.file = file;
      }

      Transform.create(criteria, function(err, transform) {

        callback(err, transform);

      });

    };

// Updates an existing transform in the DB.(updateTransform/update)
    exports.update = function(req, callback) {

      if(req.body._id) { delete req.body._id; }

      Transform.findById(req.params.id, function (err, transform) {
        if(err){
          callback(err);
        }else{
          var updated = _.merge(transform, req.body);
          updated.save(function (err) {
            if (err) { callback(err)
            }else{
              callback(transform);
            }
          });
        }

      });
    };

// Deletes a transform from the DB.(destroyTransform/destroy)
    exports.destroy = function(id, callback) {

      Transform.findById(id, function (err, transform) {

        if(err) {

          callback(err);

        }else{

          fs.unlink(transform.file.path);
          transform.remove(function(err) {

            if(err) {

              callback(err, null);

            }else{

              callback(null,transform);

            }
          });
        }
      });
    };


    function handleError(res, err) {
      return res.status(500).send(err);
    }
