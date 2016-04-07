'use strict';

angular.module('imageProcessingApp')
  .controller('ProcessingCtrl', function ($scope, Auth, $location, $state) {
    var Processing = this;

    Processing.isLoggedIn =Auth.isLoggedIn();
    Processing.message = 'Hello Akash';

   /* if(Processing.isLoggedIn){
      $location.path('/processing/uploadImage');
    }*/
  });
