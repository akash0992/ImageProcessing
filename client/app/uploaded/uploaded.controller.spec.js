'use strict';

describe('Controller: UploadedCtrl', function () {

  // load the controller's module
  beforeEach(module('imageProcessingApp'));

  var UploadedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UploadedCtrl = $controller('UploadedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
