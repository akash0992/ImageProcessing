'use strict';

describe('Controller: UploadImageCtrl', function () {

  // load the controller's module
  beforeEach(module('imageProcessingApp'));

  var UploadImageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UploadImageCtrl = $controller('UploadImageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
