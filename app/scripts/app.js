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
