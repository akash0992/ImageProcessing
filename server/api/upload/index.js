'use strict';

var express = require('express');
var controller = require('./upload.controller');

var auth = require('../../auth/auth.service');

//var multiparty = require('multiparty');



var router = express.Router();


router.get('/getUploaded/:getUploadID', controller.show);
router.get('/getAllTransform/:id', controller.showAllUpload);
router.get('/:id', controller.showUpload);
router.get('/', auth.isAuthenticated(), controller.indexUpload);

router.post('/', auth.isAuthenticated(), function(req,res,next){
  if(!req.file){
    res.send({ result: 0, err : 'file type wrong'});
  }else{
    next();
  }
}, controller.createUpload);
router.put('/:id', auth.isAuthenticated(), controller.updateUpload);
router.patch('/:id', auth.isAuthenticated(), controller.updateUpload);
router.delete('/:id', auth.isAuthenticated(), controller.destroyUpload);

module.exports = router;
