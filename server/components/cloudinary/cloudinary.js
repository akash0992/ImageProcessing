/**
 * Created by pooja on 8/3/16.
 */

var cloudinary = require('cloudinary');
var config = require('../../config/environment/index');

cloudinary.config(config.cloudinary);


/**
 * upload images to cloud
 */

exports.cloudinary = function (data, callback) {
  cloudinary.uploader.upload(data && data.path, function (result) {
    return callback(result);
  });
};
