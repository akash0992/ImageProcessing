'use strict';

angular.module('imageProcessingApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    var Signup = this;
    Signup.user = {};
    Signup.errors = {};

    Signup.register = function(form) {
      Signup.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: Signup.user.name,
          email: Signup.user.email,
          password: Signup.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
            Signup.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            Signup.errors[field] = error.message;
          });
        });
      }
    };

    Signup.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
