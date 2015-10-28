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
    controllerAs: 'main'
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
