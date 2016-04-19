'use strict';

angular.module('imageProcessingApp')
  .controller('UploadImageCtrl', function ($scope,fileReader,UploadImageApi,$rootScope) {

    var UploadImage = this;
    UploadImage.message = 'Hello';
    UploadImage.fileName = '';
    UploadImage.imageArray = [];
    UploadImage.currentFile = '';
    UploadImage.image_source = '';
    UploadImage.loader = false;
    UploadImage.object = {};
    UploadImage.object.loader = false;
    UploadImage.object.id = '';

    UploadImageApi.get(function(result){

      UploadImage.imageArray = result;

    }, function(err){
      console.log("err", err)

    });

    $scope.clear = function(){
      if (UploadImage.file) {
        //$(".image-preview-filename").val(file.name);
        //console.log("$scope.clear.............",UploadImage.file);
        fileReader.readAsDataUrl(UploadImage.file, $scope)
          .then(function (result) {
            //console.log(UploadImage.file);
            UploadImage.image_source = result;
            UploadImage.fileName = UploadImage.file.name;
          });
      }
    }

    $scope.setFile = function(element) {

      //console.log("UploadImage.setFile.............");

      if(element.files[0]){
        UploadImage.currentFile = element.files[0];
        var reader = new FileReader();

        //console.log("element.files[0].............");

        reader.onload = function(event) {
          UploadImage.image_source = event.target.result;
          $scope.$apply();

        }
// when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
      }else{
        UploadImage.document = "";
        UploadImage.fileName = '';
        UploadImage.image_source = '';
      }

    }

    UploadImage.reject = function(){
      UploadImage.document = "";
      UploadImage.fileName = '';
      UploadImage.image_source = '';
      UploadImage.file = '';
    }

    UploadImage.upload = function(){

      UploadImage.loader = true;

      var fd = new FormData();

        fd.append('file',UploadImage.file );
        //fd.append('image_source',UploadImage.image_source );


      UploadImageApi.post(fd,function(result){


        UploadImage.imageArray.unshift(result);
        $scope.uploadImageForm.$setPristine();
        UploadImage.document = "";
        UploadImage.fileName = '';
        UploadImage.image_source = '';
        UploadImage.file = '';
        UploadImage.loader = false;

      }, function(err){
        console.log("err", err)

      });

    }

    UploadImage.delete = function(index){

      var promptFlag =  confirm("Do you want to delete this ?");

      if(promptFlag){

        UploadImage.loader = true;
        var id = UploadImage.imageArray[index]._id;

        UploadImageApi.delete({id : id},function(result){

          UploadImage.imageArray.splice(index, 1);
          UploadImage.loader = false;

        });

      }


    }

    UploadImage.transform = function(index){

      var id = UploadImage.imageArray[index]._id;
      UploadImage.object.loader = true;
      UploadImage.object.id = id;

      $scope.$emit('transform', UploadImage.object);

     // $rootScope.$broadcast('transform', UploadImage.object);

    }


    $rootScope.$on('transformDone', function(event, mass) {
      UploadImage.object.loader = mass.loader;
    });

  });
