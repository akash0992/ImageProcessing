'use strict';

describe('Controller: TransformedCtrl', function () {

  // load the controller's module
  beforeEach(module('imageProcessingApp'));

  var TransformedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransformedCtrl = $controller('TransformedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
