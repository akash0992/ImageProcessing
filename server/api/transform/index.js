'use strict';

var express = require('express');
var controller = require('./transform.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.get('/:uploadID', controller.showTransformed);
router.get('/:id', controller.showTransform);
router.get('/', controller.indexTransform);
router.post('/', auth.isAuthenticated(),function(req,res,next){
  if(!req.file){
    res.send({ result: 0, err : 'file type wrong'});
  }else{
    next();
  }
}, controller.createTransform);
router.put('/:id', auth.isAuthenticated(), controller.updateTransform);
router.patch('/:id', auth.isAuthenticated(), controller.updateTransform);
router.delete('/:id', auth.isAuthenticated(), controller.destroyTransform);
router.delete('/:uploadID', auth.isAuthenticated(), controller.destroyTransformed);


module.exports = router;
