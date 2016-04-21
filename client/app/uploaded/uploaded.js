'use strict';

angular.module('imageProcessingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('uploaded', {
        url: '/uploaded',
        templateUrl: 'app/uploaded/uploaded.html',
        controller: 'UploadedCtrl as Uploaded'
      });
  });
