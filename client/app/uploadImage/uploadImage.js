'use strict';

angular.module('imageProcessingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('uploadImage', {
        url: '/uploadImage',
        templateUrl: 'app/uploadImage/uploadImage.html',
        controller: 'UploadImageCtrl'
      });
  });