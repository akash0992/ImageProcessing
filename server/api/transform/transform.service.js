/**
 * Created by akash on 18/4/16.
 */


'use strict';

var _ = require('lodash');
var Transform = require('./transform.model');
var Upload = require('../upload/upload.model');
var fs = require('fs');
//var Transform_Controller = require('./transform.controller');
var easyImage = require('easyimage');
//var uploadImageService = require('../../../client/app/uploadImage/uploadImage.service');


var addFetchUrl = function(transform,callback){

  transform.fetchUrl = 'http://www.akashyadav.com:9000/api/transforms/'+transform._id;

  if(transform._id) { delete transform._id; }
  Transform.findById(transform._id, function (err, upload) {
    if(err){
      callback(err,null);
    }else{
      var updated = _.merge(upload, transform);
      updated.save(function (err) {
        if (err) { callback(err,null)
        }else{

          var transformImage = [];
              transformImage[0] = upload;

          callback(err,transformImage);

        }
      });
    }

  });


}


// Get list of transform(indexTransform/index)
exports.index = function(criteria, callback) {

  console.log('exports.index transform.service ..... ',criteria);

  Transform.find(criteria,function (err, transforms) {

    callback(err,transforms);

  }).sort({dateCreated:'-1'});
};


// Get a single transform(showTransform/show)
exports.show = function(criteria, callback) {

  console.log('exports.show transform.service ..... ',criteria);

  console.log('exports.show transform.service typeOf() ..... ',typeof(criteria.settings.width));


  if(criteria.settings.width){
    criteria.settings.width = parseInt(criteria.settings.width);
  }
  if(criteria.settings.height){
    criteria.settings.height = parseInt(criteria.settings.height);
  }
  if(criteria.settings.quality){
    criteria.settings.quality = parseInt(criteria.settings.quality);
  }

  console.log('exports.show transform.service typeOf() ..... ',typeof(criteria.settings.width));

  Transform.find(criteria, function (err, transform) {

    console.log('exports.show transform.service Transform.find transform ..... ',transform);

    if (err) {

      console.log('exports.show transform.service Transform.find err ..... ',err);

      callback(err, null);
    }
    else if (transform.length === 0) {

      console.log('exports.show transform.service Transform.find transform.length === 0 ..... ',(transform.length === 0));

      var uploadID = criteria.uploadID;
      var w = criteria.settings.width;
      var h = criteria.settings.height;
      var q = criteria.settings.quality;
      var format = criteria.settings.ext;
      var destination = '/home/akash/WebstormProjects/ImageProcessing/transformPicture/';
      var options = {};
      var uploadedImage = [];
      var transformImage = [];

      var url = '';
      var index = null;
      var index2 = null;
      var fileName = '';
      var source = '';

      var criteria_Object = {};
          criteria_Object.uploadID = uploadID;
          criteria_Object.settings = {};
      var resize = function(options){

      console.log('exports.show transform.service Transform.find transform.length === 0  resize ..... ',options);


        easyImage.resize(options).then(function(result) {

          if (!result) callback({err : 'err in processing'}, null);

          criteria_Object.file = result;
          criteria_Object.transformUrl = '/transform-image/';

          url = result.path;
          index = url.lastIndexOf('/');
          fileName = url.substring(index+1,url.length);

          criteria_Object.transformUrl = criteria_Object.transformUrl + fileName;

          Transform.create(criteria_Object, function(err, transform) {

            addFetchUrl(transform,function(err,transform){
              if(err) callback(err,null);
              else{
                callback(null,transform);
              }
            });

          });
        });
      }

      var convert = function(options){

        console.log('exports.show transform.service Transform.find transform.length === 0  convert ..... ',options);

        easyImage.convert(options).then(function(result) {

          if (!result) callback({err : 'err in processing'}, null);

          criteria_Object.file = result;
          criteria_Object.transformUrl = '/transform-image/';

          url = result.path;
          index = url.lastIndexOf('/');
          fileName = url.substring(index+1,url.length);

          criteria_Object.transformUrl = criteria_Object.transformUrl + fileName;

          Transform.create(criteria_Object, function(err, transform) {

            addFetchUrl(transform,function(err,transform){
              if(err) callback(err,null);
              else{
                callback(null,transform);
              }
            });
          });
        });
      }

      Upload.findById(uploadID, function (err, upload) {
        if (err) {
          callback(err, null);
        }
        else {

          console.log('exports.show transform.service Transform.find transform.length === 0 Upload.findById  ..... ',uploadID);

          uploadedImage = upload;

          url = uploadedImage.file.path;
          index = url.lastIndexOf('/');
          index2 = url.lastIndexOf('.');
          fileName = url.substring(index+1,index2);

          source = uploadedImage.file.path;

          if(w != undefined){
            options.width = w;
            criteria_Object.settings.width = w;
          }
          if(h != undefined){
            options.height = h;
            criteria_Object.settings.height = h;
          }
          if(q != undefined){
            options.quality = q;
            criteria_Object.settings.quality = q;
          }

          if(format != undefined){
            options.ext = format;
            criteria_Object.settings.ext = format;
          }else{
            criteria_Object.settings.ext = 'jpg';
          }



          options.src = source;
          options.dst = destination+Date.now() + "_" + Math.ceil(Math.random()*9999) + "_" +fileName+'.'+format;

          if(options.width){

            resize(options);

          }
          else if(options.height){

            easyImage.info(options.src).then(

              function(file) {

                options.width = file.width;

                resize(options);

              }, function (err) {
                console.log(err);
              }
            );
          }
          else{
            convert(options);
          }
        }
      });
    }
    else{
      callback(null, transform);
    }
  });
}


// Get a single transform(showTransformed/find) uploadID
exports.showTransformed = function(criteria, callback) {

  console.log('exports.showTransformed transform.service ..... ',criteria);

  Transform.find(criteria, function (err, transform) {

    if (err) {
      callback(err, null);
    }
    else{
      callback(null, transform);
    }
  });
}


// Creates a new transform in the DB.(createTransform/create)
exports.create = function(criteria, file, callback) {

  console.log('exports.criteria transform.service ..... ',criteria,file);

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

  console.log('exports.update transform.service ..... ',req.params,req.query);

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

  console.log('exports.destroy transform.service ..... ',id);

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

// Deletes a transform from the DB.(destroyTransform/destroy) destroyTransformed uploadID
exports.destroyTransformed = function(id, callback) {

  console.log('exports.destroyTransformed transform.service ..... ',id);

  var criteria = {};
  criteria.uploadID = id;


  Transform.find(criteria, function (err, transformed) {

    if(err) {
      callback(err,null);
    }
    else if(transformed && transformed.length === 0){
      callback(null,transformed);
    }
    else{

      var data = [];

      transformed.forEach(function(item,index){

        Transform.findById(transformed[index]._id, function (err, transform) {

          if(err) {

            callback(err,null);

          }else{

            fs.unlink(transform.file.path);
            transform.remove(function(err) {

              if(err) {
                callback(err);
              }else{
                if(transformed.length-1 == index){
                  callback(null,transform);
                }
               }
            });
          }
        });

      });

    }
  });
};



function handleError(res, err) {
  return res.status(500).send(err);
}
