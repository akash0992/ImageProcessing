'use strict';

describe('Controller: TransformImageCtrl', function () {

  // load the controller's module
  beforeEach(module('imageProcessingApp'));

  var TransformImageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransformImageCtrl = $controller('TransformImageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
