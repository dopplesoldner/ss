'use strict';

/**
 * @ngdoc overview
 * @name ssApp
 * @description
 * # ssApp
 *
 * Main module of the application.
 */
angular
.module('ssApp', [
  'ngRoute',
  'ui.bootstrap',
  'nvd3',
  'smart-table',
  'firebase',
  'ngProgress',
  'ngDialog'
])
.run(function($rootScope, $location, ngProgressFactory) {
  $rootScope.pb = ngProgressFactory.createInstance();

  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
})

.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main',
    resolve: {
      init: function($location, $q, authService, apiService, chartConfigFactory) {
        var defer = $q.defer();
        var init = {};

        authService.firebaseAuth.$requireAuth().then(function(currentAuth) {
          init.currentAuth = currentAuth;
          // return apiService.apiData();
          return apiService.getData();
        }).then(function(results){
          init.apiData = results;
          defer.resolve(init);
        }, function(error){
          console.log(error);
          if (error === "AUTH_REQUIRED") {
            $location.path("/login");
          }

          defer.reject();
        });

        return defer.promise;
      },
      chartConfig: function(chartConfigFactory) {
        return chartConfigFactory.chartConfig;
      }
    },
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .otherwise({
    redirectTo: '/'
  });
});
