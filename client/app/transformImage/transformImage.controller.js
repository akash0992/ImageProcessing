'use strict';

angular.module('imageProcessingApp')
  .controller('TransformImageCtrl', function ( $scope, $rootScope, UploadImageApi, TransformImageApi) {

    var TransformImage = this;
    TransformImage.message = 'Hello';

    TransformImage.object = {};
    TransformImage.object.id = '';
    TransformImage.object.loader = true;


    TransformImage.objDelete = {};
    TransformImage.objDelete.id = '';

    TransformImage.uploaded = {};
    TransformImage.transformedUpload = {};

    TransformImage.mass = {};


    TransformImage.display = false;
    TransformImage.display2 = false;
    TransformImage.displayPreview = false;


    TransformImage.url = '';

    TransformImage.deleteID = '';

    TransformImage.obj = {};
    TransformImage.obj.extSelected = '';
    TransformImage.obj.ext = '';
    TransformImage.obj.url = '';
    TransformImage.obj.urlStart = 'http://www.akashyadav.com:9000/api/uploads/';
    TransformImage.obj.imageID = '';
    TransformImage.obj.w = '&w=';
    TransformImage.obj.wVal = null;
    TransformImage.obj.h = '&h=';
    TransformImage.obj.hVal = null;
    TransformImage.obj.q = '&q=';
    TransformImage.obj.qVal = null;
    TransformImage.obj.format = '?format=';
    TransformImage.obj.formatVal = '';
    TransformImage.obj.qText = 'Selected Format :: ';
    TransformImage.obj.qTextVal = 'Selected Format :: ';

    TransformImage.img = '';

    // save initial values
    TransformImage.obj.init = function() {
      var origValues = {};
      for (var prop in this) {
        if (this.hasOwnProperty(prop) && prop != "origValues") {
          origValues[prop] = this[prop];
        }
      }
      this.origValues = origValues;
    };

    // restore initial values
    TransformImage.obj.reset = function() {
      for (var prop in this.origValues) {
        this[prop] = this.origValues[prop];
      }
    };

    TransformImage.obj.init();


    TransformImage.TransformUploadImage  = function(mass){

      console.log("TransformImage.TransformUploadImage .method called........ mass ...-------------------..",mass);

      TransformImage.obj.reset();

      TransformImage.object.id = mass.id;

      UploadImageApi.getUpload({getUploadID : TransformImage.object.id},function(result){
        console.log('UploadImageApi.get------------------result---------',result);

        TransformImage.uploaded = result[0];

        var url = TransformImage.uploaded.uploadUrl;
        var index = url.lastIndexOf('.');
        var ext = url.substring(index+1,url.length);

        TransformImage.obj.ext = ext;
        TransformImage.obj.formatVal = ext;
        TransformImage.obj.qText = TransformImage.obj.qText+TransformImage.obj.formatVal;
        TransformImage.obj.imageID = TransformImage.uploaded._id;


        TransformImage.obj.url= TransformImage.obj.urlStart+TransformImage.obj.imageID;

        TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.format+TransformImage.obj.formatVal;

        if(TransformImage.obj.wVal){
          TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.w+TransformImage.obj.wVal;
        }
        if(TransformImage.obj.hVal){
          TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.h+TransformImage.obj.hVal;
        }
        if(TransformImage.obj.qVal){
          TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.q+TransformImage.obj.qVal;
        }

        TransformImage.display = true;
        TransformImage.display2 = true;

      }, function(err){
        console.log("err", err);
      });

    };

    $rootScope.$on('transform', function(event, mass) {

      console.log("on transform ......... mass ..recieved------...",mass);


      TransformImage.mass = mass;
      TransformImage.TransformUploadImage(TransformImage.mass);

    });

    TransformImage.done = function(){

      TransformImage.object.loader = false;
      TransformImage.display = false;

      $scope.$emit('transformDone', TransformImage.object);
    }

    TransformImage.set = function(w,h,q,f){

      if(w || isNaN(w)){
        w = Math.abs(w);
        if(w < 1001){
          TransformImage.obj.wVal = w || 0;
        }else{
          TransformImage.obj.wVal = 1000;
        }
      }else{
        TransformImage.obj.wVal = TransformImage.obj.wVal;
      }


      if(h || isNaN(h)){
        h = Math.abs(h);
        if(h < 1001){
          TransformImage.obj.hVal = h || 0;
        }else{
          TransformImage.obj.hVal = 1000;
        }
      }else{
        TransformImage.obj.hVal =  TransformImage.obj.hVal;
      }


      if(q || isNaN(q)){
        q = Math.abs(q);
        if(q < 101){
          TransformImage.obj.qVal = q || 0;
        }else{
          TransformImage.obj.qVal = 100;
        }
      }else{
        TransformImage.obj.qVal = TransformImage.obj.qVal;
      }


      if(f) {
        TransformImage.obj.formatVal = f || TransformImage.obj.formatVal;
        TransformImage.obj.qText = TransformImage.obj.qTextVal+TransformImage.obj.formatVal;
      }

      //TransformImage.obj.url= TransformImage.obj.urlStart+TransformImage.obj.imageID+TransformImage.obj.w+TransformImage.obj.wVal+TransformImage.obj.h+TransformImage.obj.hVal+TransformImage.obj.q+TransformImage.obj.qVal+TransformImage.obj.format+TransformImage.obj.formatVal;

      TransformImage.obj.url= TransformImage.obj.urlStart+TransformImage.obj.imageID;

      TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.format+TransformImage.obj.formatVal;

      if(TransformImage.obj.wVal){
        TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.w+TransformImage.obj.wVal;
      }
      if(TransformImage.obj.hVal){
        TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.h+TransformImage.obj.hVal;
      }
      if(TransformImage.obj.qVal){
        TransformImage.obj.url = TransformImage.obj.url+TransformImage.obj.q+TransformImage.obj.qVal;
      }


    }

    TransformImage.transform = function(){

      var transObj = {};
      transObj.id = TransformImage.object.id;
      transObj.format = TransformImage.obj.formatVal;

      if(TransformImage.obj.hVal){
        transObj.h = TransformImage.obj.hVal;
      }
      if(TransformImage.obj.qVal){
        transObj.q = TransformImage.obj.qVal;
      }
      if(TransformImage.obj.wVal) {
        transObj.w = TransformImage.obj.wVal;
      }

      console.log("transObj .... ",transObj);

      UploadImageApi.getTransformedImage(transObj,function(img){



/*
        TransformImage.transformedUpload = result;

        TransformImage.url = result.transformUrl;

        TransformImage.deleteID = result._id;
*/

        TransformImage.display2 = false;
        TransformImage.displayPreview = true;

      }, function(err){
        console.log("err", err)
      });

    }

    TransformImage.save = function(){
      TransformImage.display2 = true;
      TransformImage.displayPreview = false;
      //TransformImage.obj.reset();

    }

    TransformImage.discard = function() {


      var promptFlag = confirm("Do you want to Discard this ?");

      if (promptFlag) {

        TransformImageApi.delete({id: TransformImage.deleteID}, function (result) {

          TransformImage.display2 = true;
          TransformImage.displayPreview = false;
          TransformImage.TransformUploadImage(TransformImage.mass);

        });


      }

    }

  });
