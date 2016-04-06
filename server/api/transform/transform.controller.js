'use strict';

var _ = require('lodash');
var Transform = require('./transform.model');

// Get list of transforms
exports.index = function(req, res) {
  Transform.find(function (err, transforms) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(transforms);
  });
};

// Get a single transform
exports.show = function(req, res) {
  Transform.findById(req.params.id, function (err, transform) {
    if(err) { return handleError(res, err); }
    if(!transform) { return res.status(404).send('Not Found'); }
    return res.json(transform);
  });
};

// Creates a new transform in the DB.
exports.create = function(req, res) {
  Transform.create(req.body, function(err, transform) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(transform);
  });
};

// Updates an existing transform in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Transform.findById(req.params.id, function (err, transform) {
    if (err) { return handleError(res, err); }
    if(!transform) { return res.status(404).send('Not Found'); }
    var updated = _.merge(transform, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(transform);
    });
  });
};

// Deletes a transform from the DB.
exports.destroy = function(req, res) {
  Transform.findById(req.params.id, function (err, transform) {
    if(err) { return handleError(res, err); }
    if(!transform) { return res.status(404).send('Not Found'); }
    transform.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}