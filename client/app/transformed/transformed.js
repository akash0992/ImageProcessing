'use strict';

angular.module('imageProcessingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('transformed', {
        url: '/transformed',
        templateUrl: 'app/transformed/transformed.html',
        controller: 'TransformedCtrl as Transformed'
      });
  });
