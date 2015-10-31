'use strict';

/**
 * @ngdoc service
 * @name ssApp.apiService
 * @description
 * # apiService
 * Service in the ssApp.
 */

angular.module('ssApp')
.factory('apiService', function ($http, $q, authService, $rootScope) {

    var getData = function() {
      return $http.get('sentimentsearch-export.json');
    };

    var apiData = function() {
      var defer = $q.defer();

      // Get a database reference to our posts
      var ref = new Firebase(authService.url);
      $rootScope.pb.start();

      // Attach an asynchronous callback to read the data at our posts reference
      ref.once("value", function(snapshot) {
        $rootScope.pb.complete();
        defer.resolve(snapshot.val());
      }, function (errorObject) {
        $rootScope.pb.complete();
        defer.reject(errorObject.code);
      });

      return defer.promise;
    };

    return {
      getData: getData,
      apiData: apiData
    };
});
