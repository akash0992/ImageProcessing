'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  userID:{
    type: mongoose.Schema.Types.ObjectId, //Reference of owner of image
    ref: 'user'
  },
  uploadUrl: String,
  file: Object,
  dateCreated:{type:String, default:Date.now}
});

module.exports = mongoose.model('Upload', UploadSchema);
