'use strict';

/**
 * @ngdoc service
 * @name ssApp.authService
 * @description
 * # authService
 * Service in the ssApp.
 */
angular.module('ssApp')
.service('authService', function ($firebaseAuth) {
  var url = "https://sentimentsearch.firebaseio.com/jones family project";
  var ref = new Firebase(url);

  return {
    url: url,
    firebaseAuth: $firebaseAuth(ref)
  };

});
