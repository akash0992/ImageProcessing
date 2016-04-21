'use strict';

angular.module('imageProcessingApp')
  .config(function ($stateProvider) {
    $stateProvider

      .state('processing', {
        url: '',
        templateUrl: 'app/processing/processing.html',
        controller: 'ProcessingCtrl as Processing',
        abstract:true
      })

      .state('processing.c1', {
        url: '/processing',
        views: {
          "viewA": {
            templateUrl: "app/uploadImage/uploadImage.html"
          },
          "viewB": {
            templateUrl: "app/transformImage/transformImage.html"
          }
        }
      })

      .state('processing.c2', {
        url: '/processed',
        views: {
          "viewA": {
            templateUrl: "app/uploaded/uploaded.html"
          },
          "viewB": {
            templateUrl: "app/transformed/transformed.html"
          }
        }
      })

      .state('processing.c3', {
        url: '/statistics',
        views: {
          "viewA": {
            templateUrl: "app/uploaded/uploaded.html"
          },
          "viewB": {
            templateUrl: "app/transformed/transformed.html"
          }
        }
      });
  });
