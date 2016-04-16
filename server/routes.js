/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');


var multer = require('multer');

var uploadPicture = multer({storage: multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, path.join(process.cwd(), 'uploadPicture'));
 },
 filename: function (req, file, cb) {
 cb(null, Date.now() + "_" + Math.ceil(Math.random()*9999) + "_" + file.originalname);
 }
 })});


var transformPicture = multer({storage: multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, path.join(process.cwd(), 'transformPicture'));
 },
 filename: function (req, file, cb) {
 cb(null, Date.now() + "_" + Math.ceil(Math.random()*9999) + "_" + file.originalname);
 }
 })});


module.exports = function(app) {

  // Insert routes below
  app.use('/api/transforms', transformPicture.single('file'), require('./api/transform'));
  app.use('/api/uploads', uploadPicture.single('file'), require('./api/upload'));

  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
