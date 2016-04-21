/**
 * Created by akash on 18/4/16.
 */

angular.module("imageProcessingApp")
  .factory('TransformImageApi', function ($resource) {

    return $resource('/api/transforms/:id/:uploadID/:criteria/:controller', {
        id: '@_id',uploadID: '@_uploadID' ,criteria: '@_criteria' ,controller: '@controller'
      },
      {
        get: {
          method: 'GET',
          isArray :true
         },

        getAll: {
          method: 'GET',
          isArray :true
         },

        post:{
          method : 'POST',
          transformRequest:angular.identity,
          headers:{'Content-Type': undefined}
        },

        put:{
          method : 'PUT'
        },

        delete:{
          method : 'DELETE'
        }
      });
  })
