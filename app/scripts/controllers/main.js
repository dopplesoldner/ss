'use strict';

/**
 * @ngdoc function
 * @name ssApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ssApp
 */
angular.module('ssApp')
.controller('MainCtrl', function ($scope, $location, $timeout, chartConfig, init, authService) {

  $scope.apiData = init.apiData;
  $scope.currentAuth = init.currentAuth;
  $scope.dataPie = [];
  $scope.dataBar = [{values: []}];
  $scope.reviewSources = [];
  $scope.latestTable = [];

  $scope.chartOptions = {
    optionsBar: angular.copy(chartConfig.multiBarChart),
    optionsPie: angular.copy(chartConfig.pieChart)
  };

  $scope.logout = function() {
    authService.firebaseAuth.$unauth();
    $location.path('/login');
  };

  //update review counts
  for (var key in $scope.apiData.reviewCount) {
    $scope.reviewSources.push({source: key, count: $scope.apiData.reviewCount[key]});
  }
  
  // update polarity chart
  for (key in $scope.apiData.polarity) {
    $scope.dataPie.push({
      "label": key,
      "value": $scope.apiData.polarity[key]
    });
  }

  //update bar chart
  $scope.apiData.average.forEach(function(f){
    if(f.Sentiment > 0) {
      $scope.dataBar[0].values.push({
        "label": f.Name,
        "value": f.Sentiment
      });
    }
  });

  //latest table
  $scope.apiData.latest.forEach(function(latest){
    $scope.latestTable.push({
      Date: latest.Date,
      Text: latest.Text,
      Sentiment: latest.Sentiment,
      Url: latest.Url,
      Source: latest.Source
    });
  });

});
