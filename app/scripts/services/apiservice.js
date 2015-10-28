'use strict';

/**
 * @ngdoc service
 * @name ssApp.apiService
 * @description
 * # apiService
 * Service in the ssApp.
 */

angular.module('ssApp')
.factory('apiService', function ($http, $q, Auth, $rootScope) {

    var readLocal = function() {
      return $http.get('SS.json');
    };

    var fireBaseData = function() {
      var defer = $q.defer();

      // Get a database reference to our posts
      var ref = new Firebase(Auth.url);

      debugger;
      $scope.pb.start();

      // Attach an asynchronous callback to read the data at our posts reference
      ref.once("value", function(snapshot) {
        $scope.pb.complete();
        defer.resolve(snapshot.val());
      }, function (errorObject) {
        $scope.pb.complete();
        defer.reject(errorObject.code);
      });

      return defer.promise;
    };

    return {
      getData: readLocal,
      apiData: fireBaseData
    };
});
