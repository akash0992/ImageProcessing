'use strict';

angular.module('imageProcessingApp')
  .controller('UploadImageCtrl', function ($scope,fileReader,UploadImageApi) {
    console.log('UploadImageCtrl has been loaded---------------------');
    var UploadImage = this;
    UploadImage.message = 'Hello';
    UploadImage.fileName = '';
    UploadImage.imageArray = [];
    UploadImage.currentFile = '';
    UploadImage.image_source = '';




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

      console.log("inside upload()");

      var fd = new FormData();

        fd.append('file',UploadImage.file );
        fd.append('image_source',UploadImage.image_source );


      var data = {
        image_source : UploadImage.image_source,
        file : UploadImage.file,
        currentFile : UploadImage.currentFile
       };

      UploadImageApi.post(fd,function(result){

        console.log("inside post() :: ",result);
        UploadImage.imageArray.unshift(result);
        $scope.uploadImageForm.$setPristine();
        UploadImage.document = "";
        UploadImage.fileName = '';
        UploadImage.image_source = '';
        UploadImage.file = '';

      }, function(err){
        console.log("err", err)

      });

    }

  });
