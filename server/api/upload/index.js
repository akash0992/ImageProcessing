'use strict';

var express = require('express');
var controller = require('./upload.controller');

var auth = require('../../auth/auth.service');



var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.indexUpload);
router.get('/:id', auth.isAuthenticated(), controller.showUpload);
router.post('/', auth.isAuthenticated(), controller.createUpload);
router.put('/:id', auth.isAuthenticated(), controller.updateUpload);
router.patch('/:id', auth.isAuthenticated(), controller.updateUpload);
router.delete('/:id', auth.isAuthenticated(), controller.destroyUpload);

module.exports = router;
