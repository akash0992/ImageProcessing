'use strict';



var UploadService = require('./upload.service');

var TransformService = require('../transform/transform.service');

var fs = require('fs');

var server = require('../../app');

// Get list of uploads
exports.indexUpload = function(req, res) {

  console.log('exports.indexUpload upload.controller ..... ',req.params,req.query);

  var criteria = {};
  criteria.userID = req.user._id;

  UploadService.index(criteria,function (err, uploads) {

    if(err) { return handleError(res, err); }

    return res.status(200).json(uploads);

  });
};

// Get a single upload
exports.show = function(req, res) {

  console.log('exports.show upload.controller ..... ',req.params,req.query);

    var id = req.params.getUploadID;

    UploadService.show(id, function (err, upload) {

      if(err) { return handleError(res, err); }

      if(!upload) { return res.status(404).send('Not Found'); }

      var transformImage = [];
      transformImage[0] = upload;

      console.log('upload showwwwwwwwwwwwwwwww ..... ',transformImage);
       return res.json(transformImage);

    });

};

// Get a single upload transformed/untransformed
exports.showUpload = function(req, res) {

  console.log('exports.showUpload upload.controller ..... ',req.params,req.query);

  if(req.query.format || req.query.w || req.query.h || req.query.q){

    console.log('exports.showUpload upload.controller ..... req.query.format');

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

    if(!req.query.format){
      criteria.settings.ext = 'jpg';
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

  }
  else{

    console.log('exports.showUpload upload.controller ..... else ..');

    var id = req.params.id;

    UploadService.show(id, function (err, upload) {

      if(err) { return handleError(res, err); }

      if(!upload) { return res.status(404).send('Not Found'); }

      var transformImage = [];
          transformImage[0] = upload;

      console.log('upload .. showupload ..... ',transformImage);
      //return res.json(transformImage);


      var url = transformImage[0].file.path;

      console.log('upload .. showupload  ....  url ..... ',url);

      return res.sendFile(url);
    });

  }

};

// Get a single upload all transformations
exports.showAllUpload = function(req, res) {


  console.log('exports.showAllUpload upload.controller ..... ',req.params,req.query);

    var criteria = {};
    criteria.uploadID = req.params.id;

    TransformService.index(criteria, function (err, transform) {

      if(err) { return handleError(res, err); }

      return res.json(transform);

    });

};

// Creates a new upload in the DB.
exports.createUpload = function(req, res) {

  console.log('exports.createUpload upload.controller ..... ',req.params,req.query);

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

  console.log('exports.updateUpload upload.controller ..... ',req.params,req.query);

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

  console.log('exports.destroyUpload upload.controller ..... ',req.params,req.query);

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
