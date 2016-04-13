'use strict';



var UploadService = require('./upload.service');

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
exports.showUpload = function(req, res) {

  var id = req.params.id;

  UploadService.show(id, function (err, upload) {

    if(err) { return handleError(res, err); }

    if(!upload) { return res.status(404).send('Not Found'); }

    return res.json(upload);

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
