'use strict';

angular.module('imageProcessingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('transformImage', {
        url: '/transformImage',
        templateUrl: 'app/transformImage/transformImage.html',
        controller: 'TransformImageCtrl as TransformImage'
      });
  });
