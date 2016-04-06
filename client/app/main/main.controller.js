'use strict';

angular.module('imageProcessingApp')
  .controller('MainCtrl', function ($scope, $http) {

    var Main = this;
    Main.awesomeThings = [
      {name:'Crop',info:'Crop the image'},
      {name:'Quality',info:'Alter the quality'},
      {name:'Extension',info:'Change the extension'}
    ];



  });
