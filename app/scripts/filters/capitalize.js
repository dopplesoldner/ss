'use strict';

/**
 * @ngdoc filter
 * @name ssApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the ssApp.
 */
angular.module('ssApp')
.filter('capitalize', function () {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  };
});
