'use strict';

angular.module('imageProcessingApp')
  .controller('UploadedCtrl', function ($scope,UploadImageApi) {
    var Uploaded = this;
    Uploaded.message = 'Hello';
    Uploaded.imageArray = [];
    Uploaded.obj = {};

    Uploaded.obj.flag = false;
    Uploaded.obj.uploadID = '';

    UploadImageApi.get(function(result){

      Uploaded.imageArray = result;

      if(Uploaded.imageArray.length > 0){
        var id = Uploaded.imageArray[0]._id;
        Uploaded.object_id = id;
        Uploaded.flag = false;
        $scope.$emit('showTransform', Uploaded.object_id);
      }

    }, function(err){
      console.log("err", err)

    });

    Uploaded.delete = function(index){

      var promptFlag =  confirm("Do you want to delete this ?");

      if(promptFlag){
        Uploaded.obj.flag = true;
        var id = Uploaded.imageArray[index]._id;
        Uploaded.obj.uploadID = Uploaded.imageArray[index]._id;

        UploadImageApi.delete({id : id},function(result){

          $scope.$emit('deleteTransform', Uploaded.obj);
          Uploaded.imageArray.splice(index, 1);
          Uploaded.flag = false;
        });

      }


    }

    Uploaded.showTransform = function(index){

      var id = Uploaded.imageArray[index]._id;
      Uploaded.object_id = id;
      Uploaded.flag = false;
      $scope.$emit('showTransform', Uploaded.object_id);
    }

  });
