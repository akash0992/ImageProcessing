'use strict';

angular.module('imageProcessingApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    var Login = this;
    Login.user = {};
    Login.errors = {};

    Login.login = function(form) {
      Login.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: Login.user.email,
          password: Login.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
            Login.errors.other = err.message;
        });
      }
    };

    Login.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
