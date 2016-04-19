'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransformSchema = new Schema({
  userID:{
    type: mongoose.Schema.Types.ObjectId, //Reference of owner of image
    ref: 'user'
  },
  uploadID: String,
  transformUrl: String,
  settings:{
    width:{type:Number},
    height:{type:Number},
    quality:{type:Number},
    ext:{type:String}  //ext = extension
  },
  file: Object,
  dateCreated:{type:String, default:Date.now}
});

module.exports = mongoose.model('Transform', TransformSchema);
