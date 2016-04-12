'use strict';

angular.module('imageProcessingApp')
  .controller('ProcessingCtrl', function ($scope, Auth, $location, $state) {
    var Processing = this;
    Processing.modalShow = false;

    Processing.isLoggedIn =Auth.isLoggedIn();
    Processing.message = 'Hello Akash';

   /* if(Processing.isLoggedIn){
      $location.path('/processing/uploadImage');
    }*/
   /* Processing.clearModal = function(e){
      if(e.target== e.currentTarget)
      Processing.modalShow = false;
    }
    Processing.modalShowFunc = function(){
      Processing.modalShow = true;

    }*/
  });
