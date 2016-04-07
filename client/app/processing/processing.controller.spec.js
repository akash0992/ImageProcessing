'use strict';

describe('Controller: ProcessingCtrl', function () {

  // load the controller's module
  beforeEach(module('imageProcessingApp'));

  var ProcessingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProcessingCtrl = $controller('ProcessingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
