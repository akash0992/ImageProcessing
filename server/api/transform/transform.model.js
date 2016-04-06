'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransformSchema = new Schema({
  uploadUrl: String,
  transformUrl: String,
  settings:{
    width:{type:Number},
    height:{type:Number},
    quality:{type:Number},
    ext:{type:String}  //ext = extension
  }
});

module.exports = mongoose.model('Transform', TransformSchema);
