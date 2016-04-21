'use strict';



var UploadService = require('./upload.service');

var TransformService = require('../transform/transform.service');

var fs = require('fs');

var server = require('../../app');

// Get list of uploads
exports.indexUpload = function(req, res) {

  var criteria = {};
  criteria.userID = req.user._id;

  UploadService.index(criteria,function (err, uploads) {

    if(err) { return handleError(res, err); }

    return res.status(200).json(uploads);

  });
};


// Get a single upload
exports.show = function(req, res) {

console.log('params .... ',req.params);
    var id = req.params.getUploadID;

    UploadService.show(id, function (err, upload) {

      if(err) { return handleError(res, err); }

      if(!upload) { return res.status(404).send('Not Found'); }

      var transformImage = [];
      transformImage[0] = upload;

      console.log('upload showwwwwwwwwwwwwwwww ..... ',upload);
       return res.json(transformImage);

    });

};


// Get a single upload transformed/untransformed
exports.showUpload = function(req, res) {

  if(req.query.format){

    var criteria = {};
    criteria.uploadID = req.params.id;
    criteria.settings = {};

    if(req.query.w){
      criteria.settings.width = req.query.w;
    }
    if(req.query.h){
      criteria.settings.height = req.query.h;
    }
    if(req.query.q){
      criteria.settings.quality = req.query.q;
    }

    criteria.settings.ext = req.query.format;

    TransformService.show(criteria, function (err, transform) {

      if(err) { return handleError(res, err); }

     // console.log(' server .... ',server.address());

      //return res.json(transform);

      //console.log('transform[0] ... ',transform[0]);

      var url = transform[0].file.path;

      return res.sendFile(url);

    });

  }else{

    var id = req.params.id;

    UploadService.show(id, function (err, upload) {

      if(err) { return handleError(res, err); }

      if(!upload) { return res.status(404).send('Not Found'); }

      var transformImage = [];
          transformImage[0] = upload;

      console.log('upload .. showupload ..... ',upload);
      /*
      return res.json(transformImage);*/


      var url = transformImage[0].file.path;

      return res.sendFile(url);
    });

  }

};

// Get a single upload all transformations
exports.showAllUpload = function(req, res) {

    var criteria = {};
    criteria.uploadID = req.params.id;

    TransformService.index(criteria, function (err, transform) {

      if(err) { return handleError(res, err); }

      return res.json(transform);

    });

};

// Creates a new upload in the DB.
exports.createUpload = function(req, res) {

  var userID = req.user._id;
  var file = req.file;

  //console.log("req :: ",req);
  //console.log("file :: ",file);

  UploadService.create(userID, file, function(err, upload) {

    if(err) { return handleError(res, err); }

    return res.status(201).json(upload);

  });
};

// Updates an existing upload in the DB.
exports.updateUpload = function(req, res) {

  UploadService.update(req, function (err, upload) {

    if (err) { return handleError(res, err); }

    if(!upload) {
      return res.status(404).send('Not Found');
    } else{
        return res.status(200).json(upload);
      }
  });
};

// Deletes a upload from the DB.
exports.destroyUpload = function(req, res) {

  var id = req.params.id;

  UploadService.destroy(id, function (err, upload) {

    if(err) { return handleError(res, err); }

    if(!upload) {
      return res.status(404).send('Not Found');
    }else{
      return res.status(204).send('No Content');
    }
  });
};

function handleError(res, err) {

  return res.status(500).send(err);

}
