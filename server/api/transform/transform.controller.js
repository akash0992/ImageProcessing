'use strict';


var TransformService = require('./transform.service');

// Get list of transforms
exports.indexTransform = function(req, res) {

  var criteria = {};
  criteria.userID = req.user._id;

  TransformService.index(criteria,function (err, transform) {

    if(err) { return handleError(res, err); }

    return res.status(200).json(transform);

  });
};

// Get a single transform
exports.showTransform = function(req, res) {

  var criteria = {};
  criteria.uploadID = req.params.id;
  criteria.settings = {};
  criteria.settings.width = req.query.w;
  criteria.settings.height = req.query.h;
  criteria.settings.quality = req.query.q;
  criteria.settings.ext = req.query.format;

  console.log("criteria ..... ",criteria);

  TransformService.show(criteria, function (err, transform) {

    if(err) { return handleError(res, err); }

    return res.json(transform);

  });
};

// Creates a new transform in the DB.
exports.createTransform = function(req, res) {

  var criteria = {};
  criteria.userID = req.user._id;
  criteria.uploadID = req.uploadID;
  criteria.transformUrl = '';
  criteria.settings = {};
  criteria.settings.width = req.width;
  criteria.settings.height = req.height;
  criteria.settings.quality = req.quality;
  criteria.settings.ext = req.ext;
  criteria.file = {};

  var file = req.file;


  TransformService.create(criteria, file, function(err, transform) {

    if(err) { return handleError(res, err); }

    return res.status(201).json(transform);

  });
};

// Updates an existing transform in the DB.
exports.updateTransform = function(req, res) {

  TransformService.update(req, function (err, transform) {

    if (err) { return handleError(res, err); }

    if(!transform) {
      return res.status(404).send('Not Found');
    } else{
      return res.status(200).json(transform);
    }
  });
};

// Deletes a transform from the DB.
exports.destroyTransform = function(req, res) {

  var id = req.params.id;

  TransformService.destroy(id, function (err, transform) {

    if(err) { return handleError(res, err); }

    if(!transform) {
      return res.status(404).send('Not Found');
    }else{
      return res.status(204).send('No Content');
    }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
