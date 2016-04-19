/**
 * Created by akash on 18/4/16.
 */

angular.module("imageProcessingApp")
  .factory('TransformImageApi', function ($resource) {

    return $resource('/api/transforms/:id/:criteria/:controller', {
        id: '@_id',criteria: '@_criteria' ,controller: '@controller'
      },
      {
        get: {
          method: 'GET',
          isArray :false
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
