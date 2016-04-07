/**
 * Created by akash on 7/4/16.
 */

angular.module('imageProcessingApp')
  .directive('fileModel',['$parse',function($parse){
    return{
      restrict:'A',
      link:function(scope,elem,attrs){
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        elem.bind('change',function(){
          scope.$apply(function(){
            modelSetter(scope,elem[0].files[0]);
            scope.clear();
          });
        });

        elem.bind('click', function () {
          scope.$apply(function () {
            modelSetter(scope, elem[0].files[0]);
            scope.clear();
          });
        });

      }
    }

  }])
  .directive('validFile', function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, el, attrs, ngModel) {
        el.bind('change', function () {
          scope.$apply(function () {
            ngModel.$setViewValue(el.val());
          });
        });
      }
    }
  })
