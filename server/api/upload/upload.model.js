'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  userID:{
    type: mongoose.Schema.Types.ObjectId, //Reference of owner of image
    ref: 'user'
  },
  uploadUrl: String
});

module.exports = mongoose.model('Upload', UploadSchema);
