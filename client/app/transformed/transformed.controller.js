'use strict';

angular.module('imageProcessingApp')
  .controller('TransformedCtrl', function ($scope,$rootScope,TransformImageApi) {
    var Transformed = this;
    Transformed.message = 'Hello';
    Transformed.uploadID = '';
    Transformed.mass = {};
    Transformed.transformArray = [];
    Transformed.obj = {};



    Transformed.TransformUploadImage  = function(mass){

      Transformed.uploadID = mass;

      TransformImageApi.get({uploadID : Transformed.uploadID},function(result){

        Transformed.transformArray = result;

        //$scope.$digest();

      }, function(err){
        console.log("err", err)
      });

    }

    $rootScope.$on('showTransform', function(event, mass) {

      Transformed.mass = mass;
      Transformed.TransformUploadImage(Transformed.mass);

    });


    $rootScope.$on('deleteTransform', function(event, mass) {

      Transformed.obj = mass;
      if(Transformed.obj.flag){

          Transformed.transformArray.splice(0,Transformed.transformArray.length)

      }

    });

    Transformed.discard = function(index) {


      var promptFlag = confirm("Do you want to Discard this ?");

      if (promptFlag) {

        var id = Transformed.transformArray[index]._id;


        TransformImageApi.delete({id: id}, function (result) {

          Transformed.transformArray.splice(index, 1);

        });


      }

    }


  });
