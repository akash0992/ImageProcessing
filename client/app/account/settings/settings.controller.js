'use strict';

angular.module('imageProcessingApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {

    var Setting = this;
    Setting.errors = {};

    Setting.changePassword = function(form) {
      Setting.submitted = true;
      if(form.$valid) {
        Auth.changePassword( Setting.user.oldPassword, Setting.user.newPassword )
        .then( function() {
            Setting.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
            Setting.errors.other = 'Incorrect password';
            Setting.message = '';
        });
      }
		};
  });
