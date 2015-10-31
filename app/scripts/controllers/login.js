'use strict';

/**
 * @ngdoc function
 * @name ssApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ssApp
 */
angular.module('ssApp')
.controller('LoginCtrl', function ($scope, $location, authService, $timeout) {

  $scope.user = {
    email: '',
    password: ''
  };

  $scope.authService = authService.firebaseAuth;

  $scope.submitForm = function() {
    $scope.pb.start();

    $scope.authService.$authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $scope.pb.complete();
      $location.path('/');
    }).catch(function(error) {
      console.error("authentication failed:", error);
      $scope.pb.complete();
      $scope.login.authMsg = 'Please check your credentials and try again!';

      $timeout(function () {
        $scope.login.authMsg = null;
      }, 2000);

    });
  };
});
