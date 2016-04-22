/**
 * Created by akash on 7/4/16.
 */

(function (module) {

  var fileReader = function ($q, $log) {

    var onLoad = function(reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    };

    var onError = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    };

    var onProgress = function(reader, scope) {
      return function (event) {
        scope.$broadcast("fileProgress",
          {
            total: event.total,
            loaded: event.loaded
          });
      };
    };

    var getReader = function(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
    };

    var readAsDataURL = function (file, scope) {
      var deferred = $q.defer();

      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);

      return deferred.promise;
    };

    return {
      readAsDataUrl: readAsDataURL
    };
  };

  module.factory("fileReader",
    ["$q", "$log", fileReader]);

}(angular.module("imageProcessingApp")));


angular.module("imageProcessingApp")
  .factory('UploadImageApi', function ($resource) {

    return $resource('/api/uploads/:controller/:id/:getUploadID', {
        id: '@_id',controller: '@controller'
      },
      {
        getUpload: {
          method: 'GET',
          params: {
            controller: 'getUploaded'
          },
          isArray :true
        },

        get: {
          method: 'GET',
          isArray :true
        },

        getAll: {
          method: 'GET',
          controller: 'getAllTransform',
          isArray :true
        },

        getUploadImage: {
          method: 'GET',
          isArray :true
        },

        getTransformedImage: {
          method: 'GET',
          isArray :false
        },

        post:{
          method : 'POST',
          transformRequest:angular.identity,
          headers:{'Content-Type': undefined}
        },

        delete:{
          method : 'DELETE'
        }
      });
  })
